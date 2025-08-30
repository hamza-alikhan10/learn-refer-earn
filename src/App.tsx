import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./ReduxStore/provider";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RenderRoutes from "./structure/RenderRoutes";

const queryClient = new QueryClient();

const App = () => (
  <Providers>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RenderRoutes/>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Providers>
);

export default App;
