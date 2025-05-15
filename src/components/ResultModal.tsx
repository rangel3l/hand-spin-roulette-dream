
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
  termNumber?: string | null;
}

export const ResultModal = ({ isOpen, onOpenChange, result, explanation, termNumber }: ResultModalProps) => {
  // Extrair o nome do termo da explicação (que vem no formato "Nome do Termo: Explicação")
  const termName = explanation ? explanation.split(':')[0] : null;
  const termExplanation = explanation ? explanation.split(':').slice(1).join(':').trim() : null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-green-700 border-yellow-400 text-white">
        <DialogHeader>
          <DialogTitle className="text-yellow-400 text-2xl flex gap-2">
            {termNumber && <span className="bg-white text-green-700 w-8 h-8 flex items-center justify-center rounded-full">{termNumber}</span>}
            {termName || result}
          </DialogTitle>
          <DialogDescription className="text-white text-lg">
            {termExplanation || explanation}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
