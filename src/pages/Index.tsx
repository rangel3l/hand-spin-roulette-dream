
import { useEffect, useRef, useState } from "react";
import { RouletteWheel } from "@/components/RouletteWheel";
import { Instructions } from "@/components/Instructions";
import { SpinButton } from "@/components/SpinButton";

const Index = () => {
  const [spinning, setSpinning] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for clockwise, -1 for counter-clockwise
  const [result, setResult] = useState<number | null>(null);
  const [handPosition, setHandPosition] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Connect to Python-Eel backend
  useEffect(() => {
    // This would normally connect to the Eel backend
    // For now, we'll simulate with mock behavior
    window.addEventListener("message", (event) => {
      if (event.data.type === "hand-movement") {
        // Update direction based on hand movement direction
        setDirection(event.data.direction);
        // Update speed based on hand movement speed
        setSpeed(event.data.speed);
        setHandPosition(event.data.position);
        
        if (event.data.action === "spin") {
          handleSpin();
        }
      }
    });

    // Setup audio
    audioRef.current = new Audio("/roulette-sound.mp3");
    
    return () => {
      window.removeEventListener("message", () => {});
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleSpin = () => {
    if (spinning) return;
    
    setSpinning(true);
    setResult(null);
    
    // Play sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.loop = true; // Loop the sound while spinning
      audioRef.current.play().catch(err => console.error("Audio play error:", err));
    }
    
    // Calculate spin duration based on hand movement speed
    // Faster hand movement means longer spin time (more momentum)
    const spinDuration = Math.max(5000, Math.min(10000, 8000 + (speed * 3000)));
    
    setTimeout(() => {
      // Calculate a random result between 0 and 40
      const randomResult = Math.floor(Math.random() * 41);
      setResult(randomResult);
      
      // Don't stop spinning immediately to allow the wheel to slow down visually
      setTimeout(() => {
        setSpinning(false);
        
        // Stop sound after spinning
        if (audioRef.current) {
          // Fade out the sound gradually
          const fadeAudio = setInterval(() => {
            if (audioRef.current && audioRef.current.volume > 0.1) {
              audioRef.current.volume -= 0.1;
            } else {
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.volume = 1;
                audioRef.current.loop = false;
              }
              clearInterval(fadeAudio);
            }
          }, 100);
        }
      }, 2000);
    }, spinDuration);
  };

  // For testing without the Python backend
  const handleTestSpin = () => {
    setSpeed(0.5 + Math.random() * 0.5);
    setDirection(Math.random() > 0.5 ? 1 : -1);
    handleSpin();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-800 p-4">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">Roulette Wheel</h1>
      
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
        <div className="w-full max-w-md">
          <Instructions />
          <div className="mt-6">
            <SpinButton onClick={handleTestSpin} disabled={spinning} />
          </div>
          
          {handPosition > 0 && (
            <div className="mt-4 p-4 bg-green-700 rounded-lg">
              <p className="text-white">Hand Position: {handPosition}</p>
              <p className="text-white">Direction: {direction > 0 ? "Right" : "Left"}</p>
              <p className="text-white">Speed: {speed.toFixed(2)}</p>
            </div>
          )}
          
          {result !== null && (
            <div className="mt-6 p-4 bg-yellow-600 rounded-lg text-center">
              <h2 className="text-3xl font-bold text-white">Result: {result}</h2>
              {result === 0 && <p className="text-xl text-white mt-2">Again!</p>}
              {result % 10 === 0 && result !== 0 && <p className="text-xl text-white mt-2">Again!</p>}
              {result % 20 === 0 && result !== 0 && <p className="text-xl text-white mt-2">Again!</p>}
              {result % 30 === 0 && result !== 0 && <p className="text-xl text-white mt-2">Again!</p>}
            </div>
          )}
        </div>
        
        <div className="relative max-w-xl">
          <RouletteWheel 
            spinning={spinning} 
            spinSpeed={speed} 
            direction={direction}
            result={result}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
