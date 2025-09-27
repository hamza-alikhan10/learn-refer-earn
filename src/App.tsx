import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./ReduxStore/provider";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./lib/ScrollToTop";
import EarnLabsPromo from "./pages/EarnLabsPromo";
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
          <ScrollToTop />
          <Routes>
            {/* Your existing dynamic routes */}
            <Route path="/*" element={<RenderRoutes />} />

            {/* New route for EarnLabsPromo */}
            <Route path="/earnlabs-promo" element={<EarnLabsPromo />} />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Providers>
);

export default App;
