import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { RoleSelection, UserRole } from "@/components/RoleSelection";
import { VendorDashboard } from "@/components/dashboards/VendorDashboard";
import { InspectorDashboard } from "@/components/dashboards/InspectorDashboard";
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";

const queryClient = new QueryClient();

type AppState = "splash" | "role-selection" | "dashboard";

const App = () => {
  const [appState, setAppState] = useState<AppState>("splash");
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);

  const handleGetStarted = () => {
    setAppState("role-selection");
  };

  const handleBack = () => {
    setAppState("splash");
  };

  const handleLogin = (role: UserRole, credentials: { username: string; password: string }) => {
    // Since this app needs backend functionality (authentication, database), 
    // we'll simulate login for the UI demo
    console.log("Login attempted:", { role, credentials });
    setCurrentRole(role);
    setAppState("dashboard");
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setAppState("splash");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {appState === "splash" && (
          <SplashScreen onGetStarted={handleGetStarted} />
        )}
        
        {appState === "role-selection" && (
          <RoleSelection onBack={handleBack} onLogin={handleLogin} />
        )}
        
        {appState === "dashboard" && currentRole === "vendor" && (
          <VendorDashboard onLogout={handleLogout} />
        )}
        
        {appState === "dashboard" && currentRole === "inspector" && (
          <InspectorDashboard onLogout={handleLogout} />
        )}
        
        {appState === "dashboard" && currentRole === "admin" && (
          <AdminDashboard onLogout={handleLogout} />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
