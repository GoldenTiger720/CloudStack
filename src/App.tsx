import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Instances from "./pages/Instances";
import Networks from "./pages/Networks";
import Storage from "./pages/Storage";
import Users from "./pages/Users";
import Security from "./pages/Security";
import Monitoring from "./pages/Monitoring";
import AuditLogs from "./pages/AuditLogs";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          <Route path="/instances" element={
            <DashboardLayout>
              <Instances />
            </DashboardLayout>
          } />
          <Route path="/networks" element={
            <DashboardLayout>
              <Networks />
            </DashboardLayout>
          } />
          <Route path="/storage" element={
            <DashboardLayout>
              <Storage />
            </DashboardLayout>
          } />
          <Route path="/users" element={
            <DashboardLayout>
              <Users />
            </DashboardLayout>
          } />
          <Route path="/security" element={
            <DashboardLayout>
              <Security />
            </DashboardLayout>
          } />
          <Route path="/monitoring" element={
            <DashboardLayout>
              <Monitoring />
            </DashboardLayout>
          } />
          <Route path="/logs" element={
            <DashboardLayout>
              <AuditLogs />
            </DashboardLayout>
          } />
          <Route path="/settings" element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
