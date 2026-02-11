import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

const toNumber = (value: string): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState("25000");
  const [annualRate, setAnnualRate] = useState("8.5");
  const [years, setYears] = useState("5");

  const result = useMemo(() => {
    const p = toNumber(principal);
    const rate = toNumber(annualRate) / 100 / 12;
    const months = Math.max(1, Math.floor(toNumber(years) * 12));

    if (p <= 0) {
      return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
    }

    if (rate === 0) {
      const monthly = p / months;
      return {
        monthlyPayment: monthly,
        totalPayment: monthly * months,
        totalInterest: 0,
      };
    }

    const monthlyPayment = (p * rate * (1 + rate) ** months) / ((1 + rate) ** months - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - p;

    return { monthlyPayment, totalPayment, totalInterest };
  }, [annualRate, principal, years]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">Loan Payment Calculator</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Estimate monthly loan payments, total repayment, and total interest cost in seconds.
          </p>

          <div className="mb-8">
            <AdPlaceholder size="banner" label="Finance partner placement" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="tool-card p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Loan Amount (USD)</label>
                <input
                  type="number"
                  min="0"
                  value={principal}
                  onChange={(event) => setPrincipal(event.target.value)}
                  className="tool-input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Annual Interest Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={annualRate}
                  onChange={(event) => setAnnualRate(event.target.value)}
                  className="tool-input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Loan Term (Years)</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={years}
                  onChange={(event) => setYears(event.target.value)}
                  className="tool-input"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="tool-card p-6 bg-primary/5">
                <p className="text-sm text-muted-foreground mb-2">Estimated Monthly Payment</p>
                <p className="text-4xl font-bold text-primary">{formatCurrency(result.monthlyPayment)}</p>
              </div>

              <div className="tool-card p-6">
                <p className="text-sm text-muted-foreground mb-2">Total Repayment</p>
                <p className="text-2xl font-semibold">{formatCurrency(result.totalPayment)}</p>
              </div>

              <div className="tool-card p-6">
                <p className="text-sm text-muted-foreground mb-2">Total Interest</p>
                <p className="text-2xl font-semibold">{formatCurrency(result.totalInterest)}</p>
              </div>
            </div>
          </div>

          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">How this is calculated</h2>
            <p className="text-muted-foreground">
              We use the standard amortization formula for fixed-rate loans. This gives you a reliable estimate for planning,
              but final lender numbers can vary due to fees, taxes, and insurance.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
