export const metadata = {
  title: 'Admin Dashboard | Cyber Ventures',
  description: 'Recruitment management dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-black font-bold">
              CV
            </div>
            <div>
              <h1 className="text-white font-bold">Admin Portal</h1>
              <p className="text-xs text-gray-400">Sentinel Gate</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <a
            href="/admin/recruitment"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <span>📊</span>
            <span className="font-medium">Dashboard</span>
          </a>
          <a
            href="/admin/candidates"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <span>👥</span>
            <span className="font-medium">Candidates</span>
          </a>
          <a
            href="/admin/challenges"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <span>🏆</span>
            <span className="font-medium">Challenges</span>
          </a>
          <a
            href="/admin/live-defense"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <span>🛡️</span>
            <span className="font-medium">Live Defense</span>
          </a>
          <a
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <span>⚙️</span>
            <span className="font-medium">Settings</span>
          </a>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 transition-colors">
            <span>🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search candidates..."
                className="bg-black/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white w-80"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white">
              <span className="text-xl">🔔</span>
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-black font-bold">
                A
              </div>
              <div className="hidden md:block">
                <p className="text-white font-medium text-sm">Admin User</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
