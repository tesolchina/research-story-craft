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
// MCCP Components
import MCCPLayout from "./pages/mccp/MCCPLayout";
import MCCPHome from "./pages/mccp/MCCPHome";
import ApiKeyPage from "./pages/mccp/ApiKeyPage";
import ResourcesPage from "./pages/mccp/ResourcesPage";
import WritingComponent from "./pages/mccp/WritingComponent";
import FeedbackPage from "./pages/mccp/FeedbackPage";
import Week1 from "./pages/mccp/Week1";
import Week1Syllabus from "./pages/mccp/Week1Syllabus";
import Weeks2to4 from "./pages/mccp/Weeks2to4";
import Weeks5to6 from "./pages/mccp/Weeks5to6";
import Weeks7to9 from "./pages/mccp/Weeks7to9";
import Week10 from "./pages/mccp/Week10";
import Weeks11to12 from "./pages/mccp/Weeks11to12";
import Week13 from "./pages/mccp/Week13";
import Syllabus from "./pages/mccp/Syllabus";
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
          
          {/* MCCP 6020 Routes */}
          <Route path="/mccp" element={<MCCPLayout />}>
            <Route index element={<MCCPHome />} />
            <Route path="api-key" element={<ApiKeyPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="syllabus" element={<Syllabus />} />
            <Route path="week1" element={<Week1 />} />
            <Route path="week1/syllabus" element={<Week1Syllabus />} />
            <Route path="weeks2-4" element={<Weeks2to4 />} />
            <Route path="weeks2-4/writing" element={<WritingComponent />} />
            <Route path="weeks5-6" element={<Weeks5to6 />} />
            <Route path="weeks7-9" element={<Weeks7to9 />} />
            <Route path="week10" element={<Week10 />} />
            <Route path="weeks11-12" element={<Weeks11to12 />} />
            <Route path="week13" element={<Week13 />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
