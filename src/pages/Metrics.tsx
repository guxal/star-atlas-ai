import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, Target, Award } from "lucide-react";

const Metrics = () => {
  const performanceData = [
    { metric: "Accuracy", value: 94.2 },
    { metric: "Macro-F1", value: 91.8 },
    { metric: "PR-AUC", value: 96.5 },
  ];

  const confusionMatrix = [
    { class: "Confirmed", predicted: { confirmed: 450, candidate: 23, false: 12 } },
    { class: "Candidate", predicted: { confirmed: 18, candidate: 380, false: 35 } },
    { class: "False Positive", predicted: { confirmed: 8, candidate: 27, false: 520 } },
  ];

  const featureImportance = [
    { feature: "Transit Depth", importance: 0.92 },
    { feature: "Period", importance: 0.85 },
    { feature: "SNR", importance: 0.78 },
    { feature: "Duration", importance: 0.65 },
    { feature: "Stellar Radius", importance: 0.43 },
    { feature: "Temperature", importance: 0.38 },
  ];

  const colors = ["hsl(263, 70%, 65%)", "hsl(220, 60%, 50%)", "hsl(280, 65%, 60%)"];

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Target className="h-8 w-8 text-primary" />
          Model Performance Metrics
        </h1>
        <p className="text-muted-foreground">Validation results and feature analysis</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {performanceData.map((item, index) => (
          <Card key={index} className="border-border bg-gradient-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                <Award className="h-4 w-4" />
                {item.metric}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{item.value}%</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Feature Importance Ranking
          </CardTitle>
          <CardDescription>Most influential features in classification</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={featureImportance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 10%, 20%)" />
              <XAxis type="number" domain={[0, 1]} stroke="hsl(215, 20%, 65%)" />
              <YAxis type="category" dataKey="feature" stroke="hsl(215, 20%, 65%)" width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(240, 10%, 12%)",
                  border: "1px solid hsl(240, 10%, 20%)",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="importance" radius={[0, 8, 8, 0]}>
                {featureImportance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-border bg-gradient-card">
        <CardHeader>
          <CardTitle>Confusion Matrix</CardTitle>
          <CardDescription>Classification accuracy breakdown by class</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">Actual / Predicted</th>
                  <th className="text-center p-4 font-medium text-muted-foreground">Confirmed</th>
                  <th className="text-center p-4 font-medium text-muted-foreground">Candidate</th>
                  <th className="text-center p-4 font-medium text-muted-foreground">False Positive</th>
                </tr>
              </thead>
              <tbody>
                {confusionMatrix.map((row, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="p-4 font-medium">{row.class}</td>
                    <td className="text-center p-4">
                      <span className="inline-block px-3 py-1 rounded bg-primary/20 text-primary font-mono">
                        {row.predicted.confirmed}
                      </span>
                    </td>
                    <td className="text-center p-4">
                      <span className="inline-block px-3 py-1 rounded bg-secondary/20 text-secondary font-mono">
                        {row.predicted.candidate}
                      </span>
                    </td>
                    <td className="text-center p-4">
                      <span className="inline-block px-3 py-1 rounded bg-destructive/20 text-destructive font-mono">
                        {row.predicted.false}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Metrics;
