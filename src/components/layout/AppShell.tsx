import { Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { SportSelector } from './SportSelector';
import { LanguageToggle } from './LanguageToggle';
import { Sidebar } from './Sidebar';
import { MobileDrillDrawer } from './MobileDrillDrawer';

export function AppShell() {
  const location = useLocation();

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Top bar */}
      <header className="flex items-center justify-between px-3 py-2 bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-slate-800 hidden md:block">SportCoach</h1>
          <SportSelector />
        </div>
        <LanguageToggle />
      </header>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — hidden on small screens */}
        <div className="hidden md:block shrink-0">
          <Sidebar />
        </div>

        {/* Content area with page transitions */}
        <main className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="h-full overflow-y-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile drill drawer (portrait/phone) */}
      <MobileDrillDrawer />
    </div>
  );
}
