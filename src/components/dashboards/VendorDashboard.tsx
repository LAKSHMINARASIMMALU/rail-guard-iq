import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Package, QrCode, FileText, LogOut, Plus, BarChart3 } from "lucide-react";
import { useState } from "react";

interface VendorDashboardProps {
  onLogout: () => void;
}

export function VendorDashboard({ onLogout }: VendorDashboardProps) {
  const [activeTab, setActiveTab] = useState<"entry" | "batches">("entry");

  const mockBatches = [
    { id: "VB001", product: "Track Clips", quantity: 500, date: "2024-01-15", status: "Active" },
    { id: "VB002", product: "Rail Pads", quantity: 200, date: "2024-01-12", status: "Completed" },
    { id: "VB003", product: "Sleepers", quantity: 100, date: "2024-01-10", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-vendor text-white p-4 shadow-elevated">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Vendor Dashboard</h1>
              <p className="text-white/80 text-sm">Product Management System</p>
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
              onClick={() => setActiveTab("entry")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "entry"
                  ? "border-vendor-orange text-vendor-orange"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Product Entry
            </button>
            <button
              onClick={() => setActiveTab("batches")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "batches"
                  ? "border-vendor-orange text-vendor-orange"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              My Batches
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {activeTab === "entry" && (
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-vendor-orange">New Product Entry</CardTitle>
                <CardDescription>
                  Enter track fitting details to generate QR codes and batch records
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lotNo">Lot Number</Label>
                    <Input id="lotNo" placeholder="LOT-2024-001" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productType">Product Type</Label>
                    <Input id="productType" placeholder="Track Clips" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" placeholder="500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mfgDate">Manufacturing Date</Label>
                    <Input id="mfgDate" type="date" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="warrantyPeriod">Warranty Period (Years)</Label>
                    <Input id="warrantyPeriod" type="number" placeholder="5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vendorId">Vendor ID</Label>
                    <Input id="vendorId" placeholder="VND-001" disabled />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specifications">Product Specifications</Label>
                  <Textarea 
                    id="specifications" 
                    placeholder="Enter detailed product specifications, materials, and compliance standards..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button className="bg-vendor-orange hover:bg-vendor-orange/90 text-white flex-1">
                    <QrCode className="w-4 h-4 mr-2" />
                    Generate QR & Submit
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "batches" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Batch Reports</h2>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            <div className="grid gap-4">
              {mockBatches.map((batch) => (
                <Card key={batch.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-vendor-orange/10 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-vendor-orange" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{batch.product}</h3>
                          <p className="text-sm text-muted-foreground">Batch ID: {batch.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Qty: {batch.quantity}</p>
                        <p className="text-sm text-muted-foreground">{batch.date}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        batch.status === "Active" ? "bg-status-pass/10 text-status-pass" :
                        batch.status === "Completed" ? "bg-muted text-muted-foreground" :
                        "bg-status-pending/10 text-status-pending"
                      }`}>
                        {batch.status}
                      </div>
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