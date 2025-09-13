import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Train, CheckCircle, Users, BarChart3 } from "lucide-react";

interface SplashScreenProps {
  onGetStarted: () => void;
}

export function SplashScreen({ onGetStarted }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-railway flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center shadow-elevated">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Train className="w-16 h-16 text-primary" />
            <CheckCircle className="w-6 h-6 text-inspector-green absolute -top-1 -right-1" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-primary mb-2">
          Railway Track Inspector
        </h1>
        
        <p className="text-muted-foreground mb-8">
          Professional quality control system for railway track fittings
        </p>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-vendor-orange/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-vendor-orange" />
            </div>
            <p className="text-xs text-muted-foreground">Vendors</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-inspector-green/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-inspector-green" />
            </div>
            <p className="text-xs text-muted-foreground">Inspectors</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-admin-blue/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <BarChart3 className="w-6 h-6 text-admin-blue" />
            </div>
            <p className="text-xs text-muted-foreground">Admins</p>
          </div>
        </div>
        
        <Button 
          onClick={onGetStarted}
          className="w-full bg-railway-blue hover:bg-railway-blue-dark text-white"
          size="lg"
        >
          Get Started
        </Button>
        
        <p className="text-xs text-muted-foreground mt-4">
          Secure • Reliable • Compliant
        </p>
      </Card>
    </div>
  );
}