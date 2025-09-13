import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Settings, LogOut, TrendingUp, AlertTriangle, Users, Package, CheckCircle, FileText, Download } from "lucide-react";
import { useState } from "react";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "reports" | "alerts">("overview");

  const mockStats = {
    totalVendors: 25,
    activeInspectors: 8,
    monthlyInspections: 1234,
    passRate: 92.5,
    pendingAlerts: 5,
    warrantyExpiring: 12
  };

  const mockVendors = [
    { id: "VND-001", name: "Steel Track Solutions", passRate: 96.2, totalItems: 2500, status: "excellent" },
    { id: "VND-002", name: "Railway Components Ltd", passRate: 89.1, totalItems: 1800, status: "good" },
    { id: "VND-003", name: "Track Fittings Pro", passRate: 78.5, totalItems: 950, status: "warning" },
  ];

  const mockAlerts = [
    { id: 1, type: "quality", message: "Vendor VND-003 pass rate dropped below 80%", severity: "high", date: "2024-01-15" },
    { id: 2, type: "warranty", message: "12 items warranty expiring in next 30 days", severity: "medium", date: "2024-01-14" },
    { id: 3, type: "inventory", message: "Low stock alert for Track Clips - Lot LOT-2024-001", severity: "low", date: "2024-01-13" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-admin text-white p-4 shadow-elevated">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-white/80 text-sm">System Monitoring & Management</p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={onLogout}
            className="text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-admin-blue text-admin-blue"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "reports"
                  ? "border-admin-blue text-admin-blue"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Reports
            </button>
            <button
              onClick={() => setActiveTab("alerts")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "alerts"
                  ? "border-admin-blue text-admin-blue"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <AlertTriangle className="w-4 h-4 inline mr-2" />
              Alerts ({mockStats.pendingAlerts})
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-admin-blue" />
                    <div>
                      <p className="text-2xl font-bold">{mockStats.totalVendors}</p>
                      <p className="text-xs text-muted-foreground">Total Vendors</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-inspector-green" />
                    <div>
                      <p className="text-2xl font-bold">{mockStats.activeInspectors}</p>
                      <p className="text-xs text-muted-foreground">Active Inspectors</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Package className="w-8 h-8 text-vendor-orange" />
                    <div>
                      <p className="text-2xl font-bold">{mockStats.monthlyInspections}</p>
                      <p className="text-xs text-muted-foreground">Monthly Inspections</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div>
                    <p className="text-2xl font-bold text-status-pass">{mockStats.passRate}%</p>
                    <p className="text-xs text-muted-foreground">Overall Pass Rate</p>
                    <Progress value={mockStats.passRate} className="mt-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-status-fail" />
                    <div>
                      <p className="text-2xl font-bold">{mockStats.pendingAlerts}</p>
                      <p className="text-xs text-muted-foreground">Pending Alerts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-status-pending" />
                    <div>
                      <p className="text-2xl font-bold">{mockStats.warrantyExpiring}</p>
                      <p className="text-xs text-muted-foreground">Warranty Expiring</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Vendor Performance */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Vendor Performance</CardTitle>
                <CardDescription>Quality metrics and performance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockVendors.map((vendor) => (
                    <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-admin-blue/10 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-admin-blue" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{vendor.name}</h3>
                          <p className="text-sm text-muted-foreground">ID: {vendor.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{vendor.passRate}% Pass Rate</p>
                        <p className="text-sm text-muted-foreground">{vendor.totalItems} items</p>
                      </div>
                      <Badge 
                        variant={vendor.status === "excellent" ? "default" : vendor.status === "good" ? "secondary" : "destructive"}
                        className={
                          vendor.status === "excellent" ? "bg-status-pass" :
                          vendor.status === "good" ? "bg-status-pending" : ""
                        }
                      >
                        {vendor.status.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">System Reports</h2>
              <Button className="bg-admin-blue hover:bg-admin-blue/90 text-white">
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Vendor Performance Report</CardTitle>
                  <CardDescription>Comprehensive vendor quality analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Detailed breakdown of vendor performance, pass rates, and quality trends over time.
                  </p>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    View Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Warranty Expiry Report</CardTitle>
                  <CardDescription>Items approaching warranty expiration</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track items with warranties expiring in the next 30, 60, and 90 days.
                  </p>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    View Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Quality Exceptions</CardTitle>
                  <CardDescription>Failed inspections and quality issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Analysis of failed inspections, recurring issues, and corrective actions.
                  </p>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    View Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Inventory Status</CardTitle>
                  <CardDescription>Current inventory levels and stock alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Real-time inventory tracking, low stock alerts, and reorder recommendations.
                  </p>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    View Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "alerts" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">System Alerts</h2>
              <Button variant="outline">
                Mark All as Read
              </Button>
            </div>

            <div className="space-y-3">
              {mockAlerts.map((alert) => (
                <Card key={alert.id} className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <AlertTriangle className={`w-6 h-6 ${
                        alert.severity === "high" ? "text-status-fail" :
                        alert.severity === "medium" ? "text-status-pending" :
                        "text-muted-foreground"
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-muted-foreground">{alert.date}</p>
                      </div>
                      <Badge 
                        variant={alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "secondary" : "outline"}
                        className={alert.severity === "medium" ? "bg-status-pending text-white" : ""}
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}