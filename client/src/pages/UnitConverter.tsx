import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

type Category = "length" | "weight" | "volume" | "temperature";

const conversions: Record<Exclude<Category, "temperature">, Record<string, number>> = {
  length: {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.34,
  },
  weight: {
    mg: 0.001,
    g: 1,
    kg: 1000,
    oz: 28.3495,
    lb: 453.592,
    ton: 1000000,
  },
  volume: {
    ml: 0.001,
    l: 1,
    gal: 3.78541,
    pt: 0.473176,
    cup: 0.236588,
    tbsp: 0.0147868,
    tsp: 0.00492892,
  },
};

const units: Record<Category, string[]> = {
  length: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
  weight: ["mg", "g", "kg", "oz", "lb", "ton"],
  volume: ["ml", "l", "gal", "pt", "cup", "tbsp", "tsp"],
  temperature: ["c", "f", "k"],
};

const unitLabels: Record<string, string> = {
  mm: "Millimeter",
  cm: "Centimeter",
  m: "Meter",
  km: "Kilometer",
  in: "Inch",
  ft: "Foot",
  yd: "Yard",
  mi: "Mile",
  mg: "Milligram",
  g: "Gram",
  kg: "Kilogram",
  oz: "Ounce",
  lb: "Pound",
  ton: "Metric Ton",
  ml: "Milliliter",
  l: "Liter",
  gal: "Gallon",
  pt: "Pint",
  cup: "Cup",
  tbsp: "Tablespoon",
  tsp: "Teaspoon",
  c: "Celsius",
  f: "Fahrenheit",
  k: "Kelvin",
};

const convertTemperature = (value: number, from: string, to: string): number => {
  if (from === to) return value;

  let celsius = value;
  if (from === "f") celsius = (value - 32) * (5 / 9);
  if (from === "k") celsius = value - 273.15;

  if (to === "c") return celsius;
  if (to === "f") return celsius * (9 / 5) + 32;
  return celsius + 273.15;
};

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("length");
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");

  const parsedValue = Number(inputValue);
  const hasInput = inputValue.trim().length > 0;
  const isValidNumber = Number.isFinite(parsedValue);

  const result = useMemo(() => {
    if (!hasInput || !isValidNumber) return "";
    if (category === "temperature") {
      return convertTemperature(parsedValue, fromUnit, toUnit).toFixed(6).replace(/\.?0+$/, "");
    }
    const fromValue = conversions[category][fromUnit];
    const toValue = conversions[category][toUnit];
    return ((parsedValue * fromValue) / toValue).toFixed(6).replace(/\.?0+$/, "");
  }, [category, fromUnit, hasInput, inputValue, isValidNumber, parsedValue, toUnit]);

  const handleCategoryChange = (newCategory: Category) => {
    const newUnits = units[newCategory];
    setCategory(newCategory);
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">Unit Converter</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Convert between length, weight, volume, and temperature units instantly.
          </p>

          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-3">Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["length", "weight", "volume", "temperature"] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryChange(cat)}
                      className={`py-2 px-4 rounded-lg font-medium transition-all ${
                        category === cat
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Value</label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Enter value"
                  className="tool-input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">From</label>
                <select value={fromUnit} onChange={(event) => setFromUnit(event.target.value)} className="tool-input">
                  {units[category].map((unit) => (
                    <option key={unit} value={unit}>
                      {unitLabels[unit]} ({unit.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">To</label>
                <select value={toUnit} onChange={(event) => setToUnit(event.target.value)} className="tool-input">
                  {units[category].map((unit) => (
                    <option key={unit} value={unit}>
                      {unitLabels[unit]} ({unit.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {!hasInput ? (
                <div className="tool-card p-6">
                  <p className="text-muted-foreground">Enter a value to see conversion results.</p>
                </div>
              ) : !isValidNumber ? (
                <div className="tool-card p-6 border-destructive/30 bg-destructive/5">
                  <p className="text-destructive">Invalid input. Please provide a valid number.</p>
                </div>
              ) : (
                <>
                  <div className="tool-card p-6 bg-primary/5">
                    <p className="text-sm text-muted-foreground mb-2">Result</p>
                    <p className="text-4xl font-bold text-primary mb-4">{result}</p>
                    <p className="text-sm text-muted-foreground">
                      {inputValue} {unitLabels[fromUnit]} = {result} {unitLabels[toUnit]}
                    </p>
                  </div>

                  <div className="tool-card p-4">
                    <p className="text-sm text-muted-foreground mb-2">Reference</p>
                    <p className="font-mono text-sm break-all">
                      {category === "temperature"
                        ? `Temperature formula: ${fromUnit.toUpperCase()} to ${toUnit.toUpperCase()}`
                        : `${inputValue} * ${conversions[category][fromUnit]} / ${conversions[category][toUnit]}`}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mb-12">
            <AdPlaceholder size="medium" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
