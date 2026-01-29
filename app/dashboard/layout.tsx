export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <main className="flex-1 bg-[#F9FAFB] overflow-y-auto">{children}</main>
    </div>
  );
}
