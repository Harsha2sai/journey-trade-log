import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ResultSliderProps {
  value: "win" | "loss" | "breakeven";
  onChange: (value: "win" | "loss" | "breakeven") => void;
}

export const ResultSlider = ({ value, onChange }: ResultSliderProps) => {
  return (
    <div className="space-y-2">
      <Label>Result</Label>
      <div className="grid grid-cols-3 gap-1 p-1 bg-muted rounded-lg">
        <button
          type="button"
          onClick={() => onChange("win")}
          className={cn(
            "px-4 py-3 rounded-md text-sm font-medium transition-all duration-200",
            value === "win"
              ? "bg-profit text-white shadow-md scale-105"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          ✅ Win
        </button>
        <button
          type="button"
          onClick={() => onChange("loss")}
          className={cn(
            "px-4 py-3 rounded-md text-sm font-medium transition-all duration-200",
            value === "loss"
              ? "bg-loss text-white shadow-md scale-105"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          ❌ Loss
        </button>
        <button
          type="button"
          onClick={() => onChange("breakeven")}
          className={cn(
            "px-4 py-3 rounded-md text-sm font-medium transition-all duration-200",
            value === "breakeven"
              ? "bg-secondary text-secondary-foreground shadow-md scale-105"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          ➖ B/E
        </button>
      </div>
    </div>
  );
};