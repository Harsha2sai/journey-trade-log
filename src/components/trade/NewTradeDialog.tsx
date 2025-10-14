import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TrendingUp, TrendingDown, Plus } from "lucide-react";
import { SymbolPicker } from "./SymbolPicker";
import { ResultSlider } from "./ResultSlider";
import { AudioRecorder } from "./AudioRecorder";
import { ImageAttachment } from "./ImageAttachment";
import { useTradeForm } from "@/hooks/useTradeForm";
import type { TradeDirection, TradeResult } from "@/types";

interface NewTradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewTradeDialog = ({ open, onOpenChange }: NewTradeDialogProps) => {
  const [isSymbolPickerOpen, setIsSymbolPickerOpen] = useState(false);

  const {
    formData,
    setFormData,
    audioFile,
    setAudioFile,
    imagePreview,
    handleImageSelect,
    isSubmitting,
    handleSubmit,
    resetForm,
  } = useTradeForm(() => onOpenChange(false));

  return (
    <>
      <SymbolPicker
        open={isSymbolPickerOpen}
        onOpenChange={setIsSymbolPickerOpen}
        onSelect={(symbol) => setFormData({ ...formData, symbol })}
      />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Log New Trade</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Symbol with Picker */}
            <div className="space-y-2">
              <Label htmlFor="symbol">Symbol</Label>
              <div className="flex gap-2">
                <Input
                  id="symbol"
                  placeholder="EUR/USD, BTC/USD, etc."
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                  className="font-mono flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setIsSymbolPickerOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Direction */}
            <div className="space-y-2">
              <Label>Direction</Label>
              <RadioGroup
                value={formData.direction}
                onValueChange={(value) => setFormData({ ...formData, direction: value as TradeDirection })}
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

            {/* Result Slider */}
            <ResultSlider
              value={formData.result}
              onChange={(value) => setFormData({ ...formData, result: value as TradeResult })}
            />

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

            {/* Attachments */}
            <div className="space-y-2">
              <Label>Attachments</Label>
              <div className="flex flex-wrap gap-2">
                <AudioRecorder
                  onAudioRecorded={(blob, duration) => setAudioFile({ blob, duration })}
                  onRemove={() => setAudioFile(null)}
                  existingAudio={audioFile ? { url: URL.createObjectURL(audioFile.blob), duration: audioFile.duration } : null}
                />
                <ImageAttachment
                  onImageSelected={handleImageSelect}
                  onRemove={() => handleImageSelect(null as any)}
                  previewUrl={imagePreview}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm();
                  onOpenChange(false);
                }}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-primary hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Trade"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
