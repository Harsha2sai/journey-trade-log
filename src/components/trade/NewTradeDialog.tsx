import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, TrendingDown } from "lucide-react";

interface NewTradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewTradeDialog = ({ open, onOpenChange }: NewTradeDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    symbol: "",
    direction: "long",
    entry: "",
    exit: "",
    size: "",
    pnl: "",
    result: "win",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.symbol || !formData.pnl) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the symbol and P&L",
        variant: "destructive",
      });
      return;
    }

    // Here you would save the trade to your database
    toast({
      title: "Trade Logged!",
      description: `${formData.symbol} trade saved successfully`,
    });

    // Reset form and close dialog
    setFormData({
      symbol: "",
      direction: "long",
      entry: "",
      exit: "",
      size: "",
      pnl: "",
      result: "win",
      notes: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Log New Trade</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Symbol */}
          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol</Label>
            <Input
              id="symbol"
              placeholder="EUR/USD, BTC/USD, etc."
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
              className="font-mono"
            />
          </div>

          {/* Direction */}
          <div className="space-y-2">
            <Label>Direction</Label>
            <RadioGroup
              value={formData.direction}
              onValueChange={(value) => setFormData({ ...formData, direction: value })}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2 flex-1">
                <RadioGroupItem value="long" id="long" />
                <Label htmlFor="long" className="flex items-center gap-2 cursor-pointer flex-1 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                  <TrendingUp className="h-4 w-4 text-profit" />
                  Long
                </Label>
              </div>
              <div className="flex items-center space-x-2 flex-1">
                <RadioGroupItem value="short" id="short" />
                <Label htmlFor="short" className="flex items-center gap-2 cursor-pointer flex-1 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                  <TrendingDown className="h-4 w-4 text-loss" />
                  Short
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Entry & Exit */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="entry">Entry Price</Label>
              <Input
                id="entry"
                type="number"
                step="0.00001"
                placeholder="1.08500"
                value={formData.entry}
                onChange={(e) => setFormData({ ...formData, entry: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exit">Exit Price</Label>
              <Input
                id="exit"
                type="number"
                step="0.00001"
                placeholder="1.08650"
                value={formData.exit}
                onChange={(e) => setFormData({ ...formData, exit: e.target.value })}
              />
            </div>
          </div>

          {/* Position Size & P&L */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="size">Position Size</Label>
              <Input
                id="size"
                type="number"
                step="0.01"
                placeholder="0.10"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pnl">P&L ($)</Label>
              <Input
                id="pnl"
                type="number"
                step="0.01"
                placeholder="125.50"
                value={formData.pnl}
                onChange={(e) => setFormData({ ...formData, pnl: e.target.value })}
                className="font-semibold"
              />
            </div>
          </div>

          {/* Result */}
          <div className="space-y-2">
            <Label htmlFor="result">Result</Label>
            <Select value={formData.result} onValueChange={(value) => setFormData({ ...formData, result: value })}>
              <SelectTrigger id="result">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="win">✅ Win</SelectItem>
                <SelectItem value="loss">❌ Loss</SelectItem>
                <SelectItem value="breakeven">➖ Break Even</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Trade Notes</Label>
            <Textarea
              id="notes"
              placeholder="What was your strategy? How did you feel? Any lessons learned?"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-primary hover:opacity-90"
            >
              Save Trade
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
