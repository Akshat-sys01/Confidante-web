import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import BlogListing from "@/pages/blog";
import BlogDetail from "@/pages/blog/[slug]";
import BlogAdmin from "@/pages/blog/admin";
import { MotionConfig } from "framer-motion";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={BlogListing} />
      <Route path="/blog/:slug" component={BlogDetail} />
      <Route path="/blog-admin" component={BlogAdmin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </MotionConfig>
  );
}

export default App;
