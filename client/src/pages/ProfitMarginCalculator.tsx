import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

const parseValue = (value: string): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export default function ProfitMarginCalculator() {
  const [cost, setCost] = useState("40");
  const [sellingPrice, setSellingPrice] = useState("65");

  const values = useMemo(() => {
    const costValue = parseValue(cost);
    const sellValue = parseValue(sellingPrice);
    const profit = sellValue - costValue;
    const margin = sellValue > 0 ? (profit / sellValue) * 100 : 0;
    const markup = costValue > 0 ? (profit / costValue) * 100 : 0;
    return { profit, margin, markup };
  }, [cost, sellingPrice]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">Profit Margin Calculator</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Instantly calculate profit, gross margin, and markup for products and services.
          </p>

          <div className="mb-8">
            <AdPlaceholder size="banner" label="Ecommerce partner placement" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="tool-card p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Cost Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={cost}
                  onChange={(event) => setCost(event.target.value)}
                  className="tool-input"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Selling Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={sellingPrice}
                  onChange={(event) => setSellingPrice(event.target.value)}
                  className="tool-input"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="tool-card p-6 bg-primary/5">
                <p className="text-sm text-muted-foreground mb-2">Profit</p>
                <p className="text-3xl font-bold text-primary">{values.profit.toFixed(2)}</p>
              </div>
              <div className="tool-card p-6">
                <p className="text-sm text-muted-foreground mb-2">Gross Margin</p>
                <p className="text-2xl font-semibold">{values.margin.toFixed(2)}%</p>
              </div>
              <div className="tool-card p-6">
                <p className="text-sm text-muted-foreground mb-2">Markup</p>
                <p className="text-2xl font-semibold">{values.markup.toFixed(2)}%</p>
              </div>
            </div>
          </div>

          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Business use cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-1">Ecommerce pricing</h3>
                <p className="text-sm text-muted-foreground">Validate margins before listing new products.</p>
              </div>
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-1">Agency retainers</h3>
                <p className="text-sm text-muted-foreground">Track service pricing against delivery costs.</p>
              </div>
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-1">Local retail</h3>
                <p className="text-sm text-muted-foreground">Set markup targets for healthier cash flow.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
