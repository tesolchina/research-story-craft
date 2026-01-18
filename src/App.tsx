import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import AIWorkshops from "./pages/AIWorkshops";
import BiologyWorkshop from "./pages/BiologyWorkshop";
import PhilosophyWorkshop from "./pages/PhilosophyWorkshop";
import AIResources from "./pages/AIResources";
import LearningApps from "./pages/LearningApps";
import Search from "./pages/Search";
import Zhou from "./pages/Zhou";
import MCCPInfo from "./pages/MCCP";
// MCCP Components
import MCCPLayout from "./pages/mccp/MCCPLayout";

import ApiKeyPage from "./pages/mccp/ApiKeyPage";
import ResourcesPage from "./pages/mccp/ResourcesPage";
import FeedbackPage from "./pages/mccp/FeedbackPage";
import Dashboard from "./pages/mccp/Dashboard";
import { AuthPage, SettingsPage } from "./features/auth";
import Week1 from "./pages/mccp/Week1";
import Week1KeyPoints from "./pages/mccp/Week1KeyPoints";
import Week1AIAgent from "./pages/mccp/Week1AIAgent";
import Week1Activity1 from "./pages/mccp/Week1Activity1";
import Week1Activity2 from "./pages/mccp/Week1Activity2";
import Week1Activity3 from "./pages/mccp/Week1Activity3";
import Week1Activity4 from "./pages/mccp/Week1Activity4";
import Weeks2to4 from "./pages/mccp/Weeks2to4";
import Weeks2to4Tasks from "./pages/mccp/Weeks2to4Tasks";
import WritingMaterialsPage from "./pages/mccp/WritingMaterialsPage";
import Weeks5to6 from "./pages/mccp/Weeks5to6";
import Weeks7to9 from "./pages/mccp/Weeks7to9";
import Week10 from "./pages/mccp/Week10";
import Weeks11to12 from "./pages/mccp/Weeks11to12";
import Week13 from "./pages/mccp/Week13";
import TeacherDashboard from "./components/mccp/TeacherDashboard";
import AssessmentPage from "./pages/mccp/AssessmentPage";
import NeedsAnalysis from "./pages/mccp/NeedsAnalysis";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/ai-workshops" element={<AIWorkshops />} />
          <Route path="/ai-workshops/biology0711" element={<BiologyWorkshop />} />
          <Route path="/biology0711" element={<Navigate to="/ai-workshops/biology0711" replace />} />
          <Route path="/ai-workshops/philosophy" element={<PhilosophyWorkshop />} />
          <Route path="/ai-workshops/resources" element={<AIResources />} />
          <Route path="/learning-apps" element={<LearningApps />} />
          <Route path="/search" element={<Search />} />
          <Route path="/zhou" element={<Zhou />} />
          <Route path="/mccp-info" element={<MCCPInfo />} />
          
          {/* MCCP 6020 Routes */}
          <Route path="/mccp" element={<MCCPLayout />}>
            <Route index element={<Navigate to="/mccp/week1" replace />} />
            <Route path="api-key" element={<ApiKeyPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="week1" element={<Week1 />} />
            <Route path="week1/key-points" element={<Week1KeyPoints />} />
            <Route path="week1/ai-agent" element={<Week1AIAgent />} />
            <Route path="week1/activity-1" element={<Week1Activity1 />} />
            <Route path="week1/activity-2" element={<Week1Activity2 />} />
            <Route path="week1/activity-3" element={<Week1Activity3 />} />
            <Route path="week1/activity-4" element={<Week1Activity4 />} />
            <Route path="weeks2-4" element={<Weeks2to4 />} />
            <Route path="weeks2-4/tasks" element={<Weeks2to4Tasks />} />
            <Route path="weeks2-4/writing-materials" element={<WritingMaterialsPage />} />
            <Route path="weeks2-4/dashboard" element={<TeacherDashboard />} />
            <Route path="weeks5-6" element={<Weeks5to6 />} />
            <Route path="weeks7-9" element={<Weeks7to9 />} />
            <Route path="week10" element={<Week10 />} />
            <Route path="weeks11-12" element={<Weeks11to12 />} />
            <Route path="week13" element={<Week13 />} />
            <Route path="assessment" element={<AssessmentPage />} />
            <Route path="needs-analysis" element={<NeedsAnalysis />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
