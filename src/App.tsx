import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { JapPassPlanBuilder } from "./pages/JapPassPlanBuilder";
import { JapTalkLevelCheck } from "./pages/JapTalkLevelCheck";
import { JapTestLegal } from "./pages/JapTestLegal";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";

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
          <Route path="/japtalk/level-check" element={<JapTalkLevelCheck />} />
          <Route path="/jappass/plan-builder" element={<JapPassPlanBuilder />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
