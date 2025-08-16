import Sidebar from '../components/Sidebar';

export default function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-[240px_1fr] min-h-screen bg-gray-50">
            <Sidebar />
            <main className="p-8">{children}</main>
        </div>
    );
}