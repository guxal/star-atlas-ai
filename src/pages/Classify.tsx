import { useState } from "react";
import { Upload, FileUp, Sparkles, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Classify = () => {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [features, setFeatures] = useState<Array<{ name: string; importance: number }>>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleRunPrediction = () => {
    // Simulate prediction
    const predictions = ["Confirmed", "Candidate", "False Positive"];
    const result = predictions[Math.floor(Math.random() * predictions.length)];
    setPrediction(result);
    setConfidence(Math.random() * 30 + 70);
    
    setFeatures([
      { name: "Transit Depth", importance: 0.92 },
      { name: "Period", importance: 0.85 },
      { name: "SNR", importance: 0.78 },
      { name: "Duration", importance: 0.65 },
      { name: "Stellar Radius", importance: 0.43 },
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500";
      case "Candidate":
        return "bg-yellow-500";
      default:
        return "bg-red-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Upload className="h-8 w-8 text-primary" />
          Classification Demo
        </h1>
        <p className="text-muted-foreground">Upload exoplanet data for AI-powered classification</p>
      </div>

      <Card className="border-border bg-gradient-card">
        <CardHeader>
          <CardTitle>Upload Dataset</CardTitle>
          <CardDescription>
            CSV file with columns: period, duration, depth, snr, stellar_radius, etc.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-muted rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer bg-background/50"
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <FileUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">
                {file ? file.name : "Drop CSV file here or click to browse"}
              </p>
              <p className="text-sm text-muted-foreground">Supports CSV files up to 10MB</p>
            </label>
          </div>

          <Button
            onClick={handleRunPrediction}
            disabled={!file}
            className="mt-4 w-full"
            size="lg"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Run Prediction
          </Button>
        </CardContent>
      </Card>

      {prediction && (
        <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
          <Card className="border-border bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Prediction Result
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Classification:</span>
                <Badge className={`${getStatusColor(prediction)} text-white px-4 py-1`}>
                  {prediction}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Confidence Score</span>
                  <span className="font-mono font-medium">{confidence.toFixed(2)}%</span>
                </div>
                <Progress value={confidence} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Feature Importance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{feature.name}</span>
                    <span className="text-muted-foreground">{(feature.importance * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={feature.importance * 100} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Classify;
