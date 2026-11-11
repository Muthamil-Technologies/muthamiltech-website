import { lazy, Suspense } from "react";
import { Route, Routes, Navigate, useParams } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { JapTutorPlanBuilder } from "./pages/JapTutorPlanBuilder";
import { JapTalkLevelCheck } from "./pages/JapTalkLevelCheck";
import { JapTestLegal } from "./pages/JapTestLegal";
import { JapTourLegal } from "./pages/JapTourLegal";
import { JapTalkLegal } from "./pages/JapTalkLegal";
import { JapanOneLegal } from "./pages/JapanOneLegal";
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
import { JOLayout } from "./components/jo/JOFooter";
import { JOGuide, JOGuides } from "./pages/jo/JOGuide";
import { JOHome } from "./pages/jo/JOHome";
import { JOSearch } from "./pages/jo/JOSearch";
import { JOAccount } from "./pages/jo/JOAccount";
import { JOTerms } from "./pages/jo/JOTerms";
import { JOContact } from "./pages/jo/JOContact";
import { JOListing } from "./pages/jo/JOListing";
import { JOSection } from "./pages/jo/JOSection";
import { LiveAddressCheck } from "./pages/jo/LiveAddressCheck";
import { StudyPathPlanner } from "./pages/jo/StudyPathPlanner";
import { StudyHome } from "./pages/jo/StudyHome";
import { LearnHome as JOLearnHome, LiveHome, TravelHome } from "./pages/jo/SectionHomes";
import { StudySchool } from "./pages/jo/StudySchool";
import { StudyFaq, StudyVisa } from "./pages/jo/StudyVisaFaq";
import { StudyCost } from "./pages/jo/StudyCost";
import { StudyScholarships } from "./pages/jo/StudyScholarships";
import { StudyChecklist } from "./pages/jo/StudyChecklist";
import { PartTimeCalculator, SalaryCalculator } from "./pages/jo/PayCalculators";
import { SswHub, WorkHome, WorkStatusPage } from "./pages/jo/WorkPages";
import { CvBuilder } from "./pages/japwork/CvBuilder";
import { PathwayFinder } from "./pages/japwork/PathwayFinder";
import { TravelPhrases } from "./pages/japtour/TravelPhrases";
import { TripPlanner } from "./pages/japtour/TripPlanner";
import { isJapanOne } from "./lib/brand";
import { PartnersHome } from "./pages/partners/PartnersHome";
import { PartnerProgramPage } from "./pages/partners/PartnerProgramPage";
import { PROGRAMS } from "./pages/partners/partnerTypes";
import { LearnGate } from "./components/jo/LearnGate";
import { SHOW_PARTNERS } from "./lib/joSections";
import { ProviderPage } from "./pages/partners/ProviderPage";

function OldLesson() {
  const { id } = useParams();
  return <Navigate to={`/learn/speaking/${id ?? ""}`} replace />;
}

/** japanone.app: the JapanOne site. Section pages, guides and every tool share one layout. */
function JapanOneApp() {
  const page = (el: React.ReactNode) => <JOLayout>{el}</JOLayout>;
  // Learning tools on the web: signed-in users only; everyone else is offered sign-in or the app.
  const learn = (el: React.ReactNode) => page(<LearnGate>{el}</LearnGate>);
  return (
    <Routes>
      <Route path="/" element={page(<JOHome />)} />
      <Route path="/search" element={page(<JOSearch />)} />
      <Route path="/guides" element={page(<JOGuides />)} />
      <Route path="/guides/:id" element={page(<JOGuide />)} />
      <Route path="/learn/level-check" element={learn(<JapTalkLevelCheck />)} />
      <Route path="/learn/plan" element={learn(<JapTutorPlanBuilder />)} />
      <Route path="/learn/jlpt" element={learn(<JapTutorTest />)} />
      <Route path="/learn/speaking" element={learn(<JapTalkLessons />)} />
      <Route path="/learn/speaking/:id" element={learn(<JapTalkLesson />)} />
      <Route path="/learn" element={page(<JOLearnHome />)} />
      <Route path="/travel" element={page(<TravelHome />)} />
      <Route path="/live" element={page(<LiveHome />)} />
      <Route path="/study" element={page(<StudyHome />)} />
      <Route path="/study/schools/:id" element={page(<StudySchool />)} />
      <Route path="/study/scholarships" element={page(<StudyScholarships />)} />
      <Route path="/study/checklist" element={page(<StudyChecklist />)} />
      <Route path="/study/cost" element={page(<StudyCost />)} />
      <Route path="/study/visa" element={page(<StudyVisa />)} />
      <Route path="/study/faq" element={page(<StudyFaq />)} />
      <Route path="/study/path" element={page(<StudyPathPlanner />)} />
      <Route path="/study/work-hours" element={<Navigate to="/guides/study-part-time" replace />} />
      <Route path="/live/address" element={page(<LiveAddressCheck />)} />
      <Route path="/work" element={page(<WorkHome />)} />
      <Route path="/work/ssw" element={page(<SswHub />)} />
      <Route path="/work/status/:id" element={page(<WorkStatusPage />)} />
      <Route path="/work/pathway" element={page(<PathwayFinder />)} />
      <Route path="/work/cv" element={page(<CvBuilder />)} />
      <Route path="/work/salary" element={page(<SalaryCalculator />)} />
      <Route path="/work/part-time" element={page(<PartTimeCalculator />)} />
      <Route path="/travel/plan" element={page(<TripPlanner />)} />
      <Route path="/travel/phrases" element={page(<TravelPhrases />)} />
      {/* Addresses from before the one-app site (shared on social and in older app builds). */}
      <Route path="/japtalk/level-check" element={<Navigate to="/learn/level-check" replace />} />
      <Route path="/japtutor/plan-builder" element={<Navigate to="/learn/plan" replace />} />
      <Route path="/learn/japtutor" element={<Navigate to="/learn/jlpt" replace />} />
      <Route path="/learn/japtalk" element={<Navigate to="/learn/speaking" replace />} />
      <Route path="/learn/japtalk/:id" element={<OldLesson />} />
      <Route path="/tour/plan" element={<Navigate to="/travel/plan" replace />} />
      <Route path="/tour/phrases" element={<Navigate to="/travel/phrases" replace />} />
      <Route path="/japanone/legal" element={page(<JapanOneLegal />)} />
      <Route path="/terms" element={page(<JOTerms />)} />
      <Route path="/contact" element={page(<JOContact />)} />
      {SHOW_PARTNERS && <Route path="/listings/:id" element={page(<JOListing />)} />}
      {SHOW_PARTNERS && <Route path="/partners" element={page(<PartnersHome />)} />}
      {SHOW_PARTNERS && PROGRAMS.map((p) => (
        <Route key={p.slug} path={`/partners/${p.slug}`} element={page(<PartnerProgramPage program={p} />)} />
      ))}
      {SHOW_PARTNERS && <Route path="/partners/tour" element={<Navigate to="/partners/travel" replace />} />}
      {SHOW_PARTNERS && <Route path="/partners/p/:id" element={page(<ProviderPage />)} />}
      {SHOW_PARTNERS && <Route path="/partners/listing/:id" element={page(<ListingEditor />)} />}
      {SHOW_PARTNERS && <Route path="/admin" element={page(<Admin />)} />}
      <Route path="/login" element={page(<Login />)} />
      <Route path="/account" element={page(<JOAccount />)} />
      <Route path="/learn/account" element={<Navigate to="/account" replace />} />
      <Route path="/:section" element={page(<JOSection />)} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Only in `npm run mock`; left out of live builds.
const PracticeBar = import.meta.env.VITE_MOCK_DB === "1" ? lazy(() => import("./lib/PracticeBar")) : null;

function App() {
  if (isJapanOne) {
    return (
      <>
        <JapanOneApp />
        {PracticeBar && <Suspense fallback={null}><PracticeBar /></Suspense>}
      </>
    );
  }
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
          <Route path="/japanone/legal" element={<JapanOneLegal />} />
          <Route path="/japtalk/level-check" element={<JapTalkLevelCheck />} />
          <Route path="/japtutor/plan-builder" element={<JapTutorPlanBuilder />} />
          <Route path="/jappass/plan-builder" element={<Navigate to="/japtutor/plan-builder" replace />} />
          <Route path="/learn" element={<LearnHome />} />
          <Route path="/learn/japtutor" element={<JapTutorTest />} />
          <Route path="/learn/japtalk" element={<JapTalkLessons />} />
          <Route path="/learn/japtalk/:id" element={<JapTalkLesson />} />
          <Route path="/learn/level-check" element={<JapTalkLevelCheck />} />
          <Route path="/learn/plan" element={<JapTutorPlanBuilder />} />
          <Route path="/learn/jlpt" element={<JapTutorTest />} />
          <Route path="/learn/speaking" element={<JapTalkLessons />} />
          <Route path="/learn/speaking/:id" element={<JapTalkLesson />} />
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
