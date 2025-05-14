
import { Button } from "@/components/ui/button";

interface SpinButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const SpinButton = ({ onClick, disabled }: SpinButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-xl disabled:opacity-50"
    >
      {disabled ? "Spinning..." : "Test Spin"}
    </Button>
  );
};
