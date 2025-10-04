import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SymbolPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (symbol: string) => void;
}

const FOREX_PAIRS = [
  "EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF",
  "AUD/USD", "USD/CAD", "NZD/USD",
  "EUR/GBP", "EUR/JPY", "GBP/JPY",
  "EUR/CHF", "AUD/JPY", "GBP/AUD",
  "EUR/AUD", "USD/SGD", "USD/HKD",
  "EUR/NZD", "GBP/CAD", "AUD/CAD",
  "AUD/NZD", "EUR/CAD", "GBP/NZD",
];

export const SymbolPicker = ({ open, onOpenChange, onSelect }: SymbolPickerProps) => {
  const [search, setSearch] = useState("");

  const filteredPairs = FOREX_PAIRS.filter((pair) =>
    pair.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (pair: string) => {
    onSelect(pair);
    onOpenChange(false);
    setSearch("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Forex Pair</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pairs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Grid of Pairs */}
          <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto">
            {filteredPairs.map((pair) => (
              <Button
                key={pair}
                variant="outline"
                onClick={() => handleSelect(pair)}
                className="h-12 text-sm font-mono hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {pair}
              </Button>
            ))}
          </div>

          {filteredPairs.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No pairs found
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};