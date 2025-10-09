import NextAuth, { type DefaultSession } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaClient, SocialProvider, GradeLevel } from './lib/generated/prisma';
import { prisma } from './lib/db';
type BcryptModule = typeof import('bcryptjs');

let cachedBcrypt: BcryptModule | null = null;

async function getBcrypt(): Promise<BcryptModule> {
  if (!cachedBcrypt) {
    cachedBcrypt = await import('bcryptjs');
  }

  return cachedBcrypt;
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      gradeLevel: GradeLevel | null;
      isNewUser?: boolean;
      isAdmin?: boolean;
    } & DefaultSession['user'];
  }

  interface User {
    gradeLevel: GradeLevel | null;
    isNewUser?: boolean;
    isAdmin?: boolean;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string;
    gradeLevel: GradeLevel | null;
    isNewUser?: boolean;
    isAdmin?: boolean;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      id: 'credentials',
      name: 'Email/Password',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('[Auth Debug] Starting authorization...');
        console.log('[Auth Debug] Received email:', credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.log('[Auth Debug] Missing credentials');
          return null;
        }

        console.log('[Auth Debug] Looking up user by email:', credentials.email);
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            gradeLevel: true,
            isAdmin: true,
          },
        });

        console.log('[Auth Debug] User found:', user ? 'Yes' : 'No');
        if (user) {
          console.log('[Auth Debug] User has password:', user.password ? 'Yes' : 'No');
        }

        if (!user || !user.password) {
          console.log('[Auth Debug] User not found or no password set');
          return null;
        }

        console.log('[Auth Debug] Comparing password...');
        const bcrypt = await getBcrypt();
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        console.log('[Auth Debug] Password valid:', isPasswordValid);

        if (!isPasswordValid) {
          console.log('[Auth Debug] Password comparison failed');
          return null;
        }

        console.log('[Auth Debug] Authorization successful for user:', user.email);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          gradeLevel: user.gradeLevel,
          isNewUser: false,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) {
        return false;
      }

      try {
        if (account?.provider === 'credentials') {
          return true;
        }

        if (!account) {
          return false;
        }

        const provider = 'GOOGLE' as SocialProvider;
        const providerId = account.providerAccountId;

        const existingUser = await prisma.user.findUnique({
          where: {
            socialProvider_socialProviderId: {
              socialProvider: provider,
              socialProviderId: providerId,
            },
          },
        });

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              socialProvider: provider,
              socialProviderId: providerId,
              name: user.name || 'User',
              email: user.email,
              gradeLevel: null,
            },
          });

          (user as any).id = newUser.id;
          (user as any).gradeLevel = null;
          (user as any).isNewUser = true;
          (user as any).isAdmin = false;
        } else {
          (user as any).id = existingUser.id;
          (user as any).gradeLevel = existingUser.gradeLevel;
          (user as any).isNewUser = false;
          (user as any).isAdmin = existingUser.isAdmin;
        }

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },

    async jwt({ token, user, trigger, session }) {
      if (user && user.id) {
        token.id = user.id;
        token.gradeLevel = user.gradeLevel;
        token.isNewUser = user.isNewUser;
        token.isAdmin = user.isAdmin;
      }

      if (trigger === 'update' && session) {
        if (session.gradeLevel !== undefined) {
          token.gradeLevel = session.gradeLevel;
          token.isNewUser = false;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
        session.user.gradeLevel = token.gradeLevel as GradeLevel | null;
        session.user.isNewUser = token.isNewUser as boolean | undefined;
        session.user.isAdmin = token.isAdmin as boolean | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
    error: '/',
  },
});
