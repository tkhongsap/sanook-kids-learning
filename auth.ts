import NextAuth, { type DefaultSession } from 'next-auth';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import { PrismaClient, SocialProvider, GradeLevel } from './lib/generated/prisma';
import { prisma } from './lib/db';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      gradeLevel: GradeLevel | null;
      isNewUser?: boolean;
    } & DefaultSession['user'];
  }

  interface User {
    gradeLevel: GradeLevel | null;
    isNewUser?: boolean;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string;
    gradeLevel: GradeLevel | null;
    isNewUser?: boolean;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
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
      if (!account || !user.email) {
        return false;
      }

      try {
        const provider = account.provider.toUpperCase() as 'GOOGLE' | 'FACEBOOK';
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
        } else {
          (user as any).id = existingUser.id;
          (user as any).gradeLevel = existingUser.gradeLevel;
          (user as any).isNewUser = false;
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
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
    error: '/',
  },
});
