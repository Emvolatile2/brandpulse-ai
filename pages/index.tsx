import { useState } from "react";
import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";

export default function Home() {
  const [brandUrl, setBrandUrl] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [topics, setTopics] = useState([]);
  const [summary, setSummary] = useState("");
  const [totalReviews, setTotalReviews] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (mode: string) => {
    try {
      setLoading(true);
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: brandUrl, mode }),
      });

      const data = await res.json();
      setSentiment(data.sentiment || {});
      setTopics(data.topics || []);
      setSummary(data.summary || "");
      setTotalReviews(data.totalReviews || 0);
    } catch (err) {
      console.error("Scan error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow">
        <div className="flex items-center gap-4">
          <img src="/jakala-logo.png" alt="Jakala Logo" className="h-12" />
          <h1 className="text-3xl font-bold">BrandPulse Report</h1>
        </div>
      </header>

      {/* Main 50/50 Split */}
      <main className="flex flex-1 overflow-hidden">
        {/* Left Report Section */}
        <section className="w-1/2 p-6 overflow-y-auto">
          <LeftPanel
            sentiment={sentiment}
            topics={topics}
            summary={summary}
            totalReviews={totalReviews}
          />
        </section>

        {/* Right Input Section */}
        <aside className="w-1/2 p-6 bg-gray-50 overflow-y-auto">
          <RightPanel
            brandUrl={brandUrl}
            setBrandUrl={setBrandUrl}
            handleScan={handleScan}
            loading={loading}
          />
        </aside>
      </main>
    </div>
  );
}