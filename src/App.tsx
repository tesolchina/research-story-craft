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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
