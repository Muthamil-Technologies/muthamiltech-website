import { Link, Route, Routes, Navigate } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { JapTutorPlanBuilder } from "./pages/JapTutorPlanBuilder";
import { JapTalkLevelCheck } from "./pages/JapTalkLevelCheck";
import { JapTestLegal } from "./pages/JapTestLegal";
import { JapTourLegal } from "./pages/JapTourLegal";
import { JapTalkLegal } from "./pages/JapTalkLegal";
import { JapTutorLegal } from "./pages/JapTutorLegal";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { Account } from "./pages/learn/Account";
import { JapTalkLesson } from "./pages/learn/JapTalkLesson";
import { JapTalkLessons } from "./pages/learn/JapTalkLessons";
import { JapTutorTest } from "./pages/learn/JapTutorTest";
import { LearnHome } from "./pages/learn/LearnHome";
import { LearnPrivacy } from "./pages/learn/LearnPrivacy";
import { Login } from "./pages/learn/Login";
import { Admin } from "./pages/partners/Admin";
import { ListingEditor } from "./pages/partners/ListingEditor";
import { JapanOneHome } from "./pages/JapanOneHome";
import { JapanOneLinks } from "./pages/JapanOneLinks";
import { CvBuilder } from "./pages/japwork/CvBuilder";
import { PathwayFinder } from "./pages/japwork/PathwayFinder";
import { TravelPhrases } from "./pages/japtour/TravelPhrases";
import { TripPlanner } from "./pages/japtour/TripPlanner";
import { isJapanOne } from "./lib/brand";
import { PartnersHome } from "./pages/partners/PartnersHome";
import { PartnerProgramPage } from "./pages/partners/PartnerProgramPage";
import { PROGRAMS } from "./pages/partners/partnerTypes";
import { ProviderPage } from "./pages/partners/ProviderPage";

/** japanone.app for now: the link page, plus the free practice the videos point to (guest only). */
function JapanOneApp() {
  return (
    <Routes>
      <Route path="/" element={<JapanOneLinks />} />
      <Route path="/learn/japtutor" element={<MiniLayout><JapTutorTest /></MiniLayout>} />
      <Route path="/learn/japtalk" element={<MiniLayout><JapTalkLessons /></MiniLayout>} />
      <Route path="/learn/japtalk/:id" element={<MiniLayout><JapTalkLesson /></MiniLayout>} />
      <Route path="/work/pathway" element={<MiniLayout><PathwayFinder /></MiniLayout>} />
      <Route path="/work/cv" element={<MiniLayout><CvBuilder /></MiniLayout>} />
      <Route path="/tour/plan" element={<MiniLayout><TripPlanner /></MiniLayout>} />
      <Route path="/tour/phrases" element={<MiniLayout><TravelPhrases /></MiniLayout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function MiniLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="theme-dark border-b border-line bg-paper">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-ink">
            <img src="/japanone_logo_180.png" alt="" className="h-9 w-9 rounded-full" />
            JapanOne
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-8 text-center text-xs text-ink-faint">© 2026 JapanOne</footer>
    </div>
  );
}

function App() {
  if (isJapanOne) return <JapanOneApp />;
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={isJapanOne ? <JapanOneHome /> : <Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/japtest/legal" element={<JapTestLegal />} />
          <Route path="/japtutor/legal" element={<JapTutorLegal />} />
          <Route path="/japtour/legal" element={<JapTourLegal />} />
          <Route path="/japtalk/legal" element={<JapTalkLegal />} />
          <Route path="/japtalk/level-check" element={<JapTalkLevelCheck />} />
          <Route path="/japtutor/plan-builder" element={<JapTutorPlanBuilder />} />
          <Route path="/jappass/plan-builder" element={<Navigate to="/japtutor/plan-builder" replace />} />
          <Route path="/learn" element={<LearnHome />} />
          <Route path="/learn/japtutor" element={<JapTutorTest />} />
          <Route path="/learn/japtalk" element={<JapTalkLessons />} />
          <Route path="/learn/japtalk/:id" element={<JapTalkLesson />} />
          <Route path="/learn/account" element={<Account />} />
          <Route path="/learn/privacy" element={<LearnPrivacy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/partners" element={<PartnersHome />} />
          {PROGRAMS.map((p) => (
            <Route key={p.slug} path={`/partners/${p.slug}`} element={<PartnerProgramPage program={p} />} />
          ))}
          <Route path="/partners/p/:id" element={<ProviderPage />} />
          <Route path="/partners/listing/:id" element={<ListingEditor />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
