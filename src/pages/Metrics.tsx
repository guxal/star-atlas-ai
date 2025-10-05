import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { TrendingUp, Target, Award } from "lucide-react";

const Metrics = () => {
  const [featureImportance, setFeatureImportance] = useState<
    { feature: string; score: number }[]
  >([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Mapeo de nombres legibles
  const featureNameMap: Record<string, string> = {
    koi_period: "Orbital Period",
    koi_duration: "Transit Duration",
    koi_depth: "Transit Depth",
    koi_impact: "Impact Parameter",
    koi_model_snr: "Signal-to-Noise Ratio (SNR)",
    koi_num_transits: "Number of Transits",
    koi_steff: "Stellar Temperature",
    koi_slogg: "Surface Gravity",
    koi_smet: "Metallicity",
    koi_srad: "Stellar Radius",
    koi_ror: "Planet-Star Radius Ratio",
    koi_prad: "Planetary Radius",
    koi_teq: "Equilibrium Temperature",
    koi_insol: "Insolation Flux",
    koi_fpflag_nt: "False Positive Flag - Not Transit",
    koi_fpflag_ss: "False Positive Flag - Stellar System",
    koi_fpflag_co: "False Positive Flag - Contamination",
    koi_fpflag_ec: "False Positive Flag - Eclipsing Binary",
  };

  // 🔹 Fetch dinámico
  useEffect(() => {
    const fetchFeatureImportance = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:8000/feature-importance");
        const data = await res.json();

        // Ordena y normaliza
        const maxScore = Math.max(...data.map((d: any) => d.score));
        const formatted = data
          .map((d: any) => ({
            feature: featureNameMap[d.feature] || d.feature,
            importance: d.score / maxScore,
          }))
          .sort((a, b) => b.importance - a.importance);

        setFeatureImportance(formatted);
      } catch (err) {
        console.error("Error fetching feature importance:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatureImportance();
  }, []);

  const colors = [
    "hsl(263, 70%, 65%)",
    "hsl(220, 60%, 50%)",
    "hsl(280, 65%, 60%)",
  ];

  const performanceData = [
    { metric: "Accuracy", value: 94.2 },
    { metric: "Macro-F1", value: 91.8 },
    { metric: "PR-AUC", value: 96.5 },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Target className="h-8 w-8 text-primary" />
          Model Performance Metrics
        </h1>
        <p className="text-muted-foreground">
          Validation results and feature analysis
        </p>
      </div>

      {/* Performance cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {performanceData.map((item, index) => (
          <Card
            key={index}
            className="border-border bg-gradient-card relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                <Award className="h-4 w-4" />
                {item.metric}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">
                {item.value}%
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Importance */}
      <Card className="border-border bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Feature Importance Ranking
          </CardTitle>
          <CardDescription>
            Most influential features in classification
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading feature importance...</p>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={featureImportance} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(240, 10%, 20%)"
                />
                <XAxis
                  type="number"
                  domain={[0, 1]}
                  stroke="hsl(215, 20%, 65%)"
                />
                <YAxis
                  type="category"
                  dataKey="feature"
                  stroke="hsl(215, 20%, 65%)"
                  width={180}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(240, 10%, 12%)",
                    border: "1px solid hsl(240, 10%, 20%)",
                    borderRadius: "0.5rem",
                  }}
                  formatter={(value: number) =>
                    `${(value * 100).toFixed(1)}% importance`
                  }
                />
                <Bar dataKey="importance" radius={[0, 8, 8, 0]}>
                  {featureImportance.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Metrics;
