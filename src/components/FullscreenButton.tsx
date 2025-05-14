
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Maximize, Minimize } from "lucide-react";

interface FullscreenButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

export const FullscreenButton = ({ targetRef }: FullscreenButtonProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (targetRef.current?.requestFullscreen) {
        targetRef.current.requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch(err => console.error("Fullscreen error:", err));
      }
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => console.error("Exit fullscreen error:", err));
    }
  };

  return (
    <Button
      variant="outline"
      className="bg-green-700 hover:bg-green-600 text-white border-yellow-400"
      onClick={toggleFullscreen}
    >
      {isFullscreen ? <Minimize className="mr-2" /> : <Maximize className="mr-2" />}
      {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
    </Button>
  );
};
