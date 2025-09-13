import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Package, SearchCheck, Settings, User, Lock } from "lucide-react";
import { useState } from "react";

export type UserRole = "vendor" | "inspector" | "admin";

interface RoleSelectionProps {
  onBack: () => void;
  onLogin: (role: UserRole, credentials: { username: string; password: string }) => void;
}

export function RoleSelection({ onBack, onLogin }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const roles = [
    {
      id: "vendor" as UserRole,
      title: "Vendor",
      description: "Product entry and batch management",
      icon: Package,
      gradient: "bg-gradient-vendor",
      color: "vendor-orange"
    },
    {
      id: "inspector" as UserRole,
      title: "Inspector",
      description: "QR scanning and quality inspection",
      icon: SearchCheck,
      gradient: "bg-gradient-inspector",
      color: "inspector-green"
    },
    {
      id: "admin" as UserRole,
      title: "Admin",
      description: "System monitoring and reporting",
      icon: Settings,
      gradient: "bg-gradient-admin",
      color: "admin-blue"
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole && username && password) {
      onLogin(selectedRole, { username, password });
    }
  };

  if (selectedRole) {
    const role = roles.find(r => r.id === selectedRole)!;
    
    return (
      <div className="min-h-screen bg-gradient-railway flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-elevated">
          <CardHeader className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedRole(null)}
              className="absolute left-4 top-4"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            
            <div className={`w-16 h-16 ${role.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <role.icon className="w-8 h-8 text-white" />
            </div>
            
            <CardTitle className="text-2xl">
              {role.title} Login
            </CardTitle>
            <CardDescription>
              {role.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">
                  <User className="w-4 h-4 inline mr-2" />
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button
                type="submit"
                className={`w-full bg-${role.color} hover:bg-${role.color}/90 text-white`}
                size="lg"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-railway flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white/80 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Select Your Role
          </h1>
          <p className="text-white/80">
            Choose your role to access the appropriate dashboard
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Card
              key={role.id}
              className="cursor-pointer transition-all hover:shadow-elevated hover:scale-105"
              onClick={() => setSelectedRole(role.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${role.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                
                <CardTitle className="text-xl mb-2">
                  {role.title}
                </CardTitle>
                
                <CardDescription>
                  {role.description}
                </CardDescription>
                
                <Button
                  className={`mt-4 bg-${role.color} hover:bg-${role.color}/90 text-white`}
                  size="sm"
                >
                  Continue as {role.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}