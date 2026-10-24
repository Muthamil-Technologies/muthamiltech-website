import { Route, Routes, Navigate } from "react-router-dom";
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
import { PartnersHome } from "./pages/partners/PartnersHome";
import { ProviderPage } from "./pages/partners/ProviderPage";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
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
