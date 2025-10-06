import { getServerSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import DashboardNav from '@/components/dashboard/DashboardNav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav user={session.user} />
      <main>{children}</main>
    </div>
  );
}
