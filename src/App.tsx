import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AppShell } from './components/layout/AppShell';
import { useWakeLock } from './hooks/useWakeLock';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const DrillLibraryPage = lazy(() => import('./pages/DrillLibraryPage').then((m) => ({ default: m.DrillLibraryPage })));
const DrillDetailPage = lazy(() => import('./pages/DrillDetailPage').then((m) => ({ default: m.DrillDetailPage })));
const GuidePage = lazy(() => import('./pages/GuidePage').then((m) => ({ default: m.GuidePage })));
const AnimationPage = lazy(() => import('./pages/AnimationPage').then((m) => ({ default: m.AnimationPage })));

function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-3 border-slate-200 border-t-slate-500 rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  useWakeLock();

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="drills" element={<DrillLibraryPage />} />
            <Route path="drill/:drillId" element={<DrillDetailPage />} />
            <Route path="drill/:drillId/guide" element={<GuidePage />} />
            <Route path="drill/:drillId/animation" element={<AnimationPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
