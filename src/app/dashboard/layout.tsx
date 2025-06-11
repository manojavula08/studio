import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { SidebarProvider } from '@/components/ui/sidebar'; // Import the provider

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}> {/* Wrap with SidebarProvider */}
      <div className="flex min-h-screen w-full">
        <div className="hidden sm:block"> {/* Hide full sidebar on small screens */}
          <DashboardSidebar />
        </div>
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-4 sm:p-6 bg-secondary/30">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
