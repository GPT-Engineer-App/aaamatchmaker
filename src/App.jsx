import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/organisms/Navbar";
import Layout from "./components/templates/Layout";
import Index from "./pages/Index";
import Meetings from "./pages/Meetings";
import ThankYou from "./pages/ThankYou";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Navbar /><Layout><Meetings /></Layout></>} />
          <Route path="/matches" element={<><Navbar /><Layout><Index /></Layout></>} />
          <Route path="/thank_you" element={<ThankYou />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
