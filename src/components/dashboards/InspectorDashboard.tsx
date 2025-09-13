import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { SearchCheck, QrCode, LogOut, Camera, CheckCircle, XCircle, Clock, FileText } from "lucide-react";
import { useState } from "react";

interface InspectorDashboardProps {
  onLogout: () => void;
}

export function InspectorDashboard({ onLogout }: InspectorDashboardProps) {
  const [activeTab, setActiveTab] = useState<"scanner" | "history">("scanner");
  const [scannedData, setScannedData] = useState<any>(null);
  const [inspectionResult, setInspectionResult] = useState<"pass" | "fail" | null>(null);

  const mockInspections = [
    { id: "INS001", lotNo: "LOT-2024-001", product: "Track Clips", result: "pass", date: "2024-01-15", vendor: "VND-001" },
    { id: "INS002", lotNo: "LOT-2024-002", product: "Rail Pads", result: "fail", date: "2024-01-14", vendor: "VND-002" },
    { id: "INS003", lotNo: "LOT-2024-003", product: "Sleepers", result: "pass", date: "2024-01-13", vendor: "VND-001" },
  ];

  const handleScanQR = () => {
    // Mock scanned data
    setScannedData({
      lotNo: "LOT-2024-004",
      vendorId: "VND-001",
      product: "Track Clips",
      mfgDate: "2024-01-10",
      warrantyPeriod: "5 years",
      specifications: "High-grade steel track clips with anti-corrosion coating"
    });
  };

  const handleSubmitInspection = () => {
    if (scannedData && inspectionResult) {
      // Mock inspection submission
      console.log("Inspection submitted:", { scannedData, result: inspectionResult });
      setScannedData(null);
      setInspectionResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-inspector text-white p-4 shadow-elevated">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SearchCheck className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Inspector Dashboard</h1>
              <p className="text-white/80 text-sm">Quality Control & Inspection</p>
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
              onClick={() => setActiveTab("scanner")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "scanner"
                  ? "border-inspector-green text-inspector-green"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <QrCode className="w-4 h-4 inline mr-2" />
              QR Scanner
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "history"
                  ? "border-inspector-green text-inspector-green"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Inspection History
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {activeTab === "scanner" && (
          <div className="max-w-2xl mx-auto space-y-6">
            {!scannedData ? (
              <Card className="shadow-card">
                <CardHeader className="text-center">
                  <CardTitle className="text-inspector-green">Scan QR Code</CardTitle>
                  <CardDescription>
                    Position the QR code within the camera frame to scan track fitting details
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="w-64 h-64 mx-auto bg-muted rounded-lg flex items-center justify-center mb-6">
                    <Camera className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <Button 
                    onClick={handleScanQR}
                    className="bg-inspector-green hover:bg-inspector-green/90 text-white"
                    size="lg"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Activate QR Scanner
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-inspector-green">Scanned Item Details</CardTitle>
                    <CardDescription>Review product information and conduct inspection</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Lot Number</p>
                        <p className="font-semibold">{scannedData.lotNo}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Vendor ID</p>
                        <p className="font-semibold">{scannedData.vendorId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Product</p>
                        <p className="font-semibold">{scannedData.product}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Manufacturing Date</p>
                        <p className="font-semibold">{scannedData.mfgDate}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Specifications</p>
                      <p className="text-sm mt-1">{scannedData.specifications}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Inspection Report</CardTitle>
                    <CardDescription>Submit your inspection results</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-3">Inspection Result</p>
                      <div className="flex gap-3">
                        <Button
                          variant={inspectionResult === "pass" ? "default" : "outline"}
                          onClick={() => setInspectionResult("pass")}
                          className={inspectionResult === "pass" ? "bg-status-pass hover:bg-status-pass/90" : ""}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Pass
                        </Button>
                        <Button
                          variant={inspectionResult === "fail" ? "destructive" : "outline"}
                          onClick={() => setInspectionResult("fail")}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Fail
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Remarks (Optional)</label>
                      <Textarea 
                        placeholder="Enter inspection notes, observations, or issues found..."
                        className="mt-2"
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleSubmitInspection}
                        disabled={!inspectionResult}
                        className="bg-inspector-green hover:bg-inspector-green/90 text-white flex-1"
                      >
                        Submit Inspection
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setScannedData(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Inspection History</h2>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            <div className="grid gap-4">
              {mockInspections.map((inspection) => (
                <Card key={inspection.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          inspection.result === "pass" ? "bg-status-pass/10" : "bg-status-fail/10"
                        }`}>
                          {inspection.result === "pass" ? 
                            <CheckCircle className="w-6 h-6 text-status-pass" /> :
                            <XCircle className="w-6 h-6 text-status-fail" />
                          }
                        </div>
                        <div>
                          <h3 className="font-semibold">{inspection.product}</h3>
                          <p className="text-sm text-muted-foreground">Lot: {inspection.lotNo}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{inspection.date}</p>
                        <p className="text-sm text-muted-foreground">Vendor: {inspection.vendor}</p>
                      </div>
                      <Badge 
                        variant={inspection.result === "pass" ? "default" : "destructive"}
                        className={inspection.result === "pass" ? "bg-status-pass" : ""}
                      >
                        {inspection.result.toUpperCase()}
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