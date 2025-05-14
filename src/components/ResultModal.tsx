
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ResultModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  result: string | null;
  explanation: string | null;
}

export const ResultModal = ({ isOpen, onOpenChange, result, explanation }: ResultModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-green-700 border-yellow-400 text-white">
        <DialogHeader>
          <DialogTitle className="text-yellow-400 text-2xl">{result}</DialogTitle>
          <DialogDescription className="text-white text-lg">
            {explanation}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
