import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { TradeFormData, AudioFile } from "@/types";

const initialFormData: TradeFormData = {
  symbol: "",
  direction: "long",
  entry: "",
  exit: "",
  size: "",
  pnl: "",
  result: "win",
  notes: "",
};

export const useTradeForm = (onSuccess: () => void) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [audioFile, setAudioFile] = useState<AudioFile | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<TradeFormData>(initialFormData);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setAudioFile(null);
    setImageFile(null);
    setImagePreview(null);
  };

  const validateForm = (): boolean => {
    if (!formData.symbol || !formData.pnl) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the symbol and P&L",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      toast({
        title: "Trade Logged!",
        description: `${formData.symbol} trade saved successfully (demo mode)`,
      });

      resetForm();
      onSuccess();
    } catch (error) {
      console.error("Error saving trade:", error);
      toast({
        title: "Error",
        description: "Failed to save trade. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    audioFile,
    setAudioFile,
    imageFile,
    imagePreview,
    handleImageSelect,
    isSubmitting,
    handleSubmit,
    resetForm,
  };
};
