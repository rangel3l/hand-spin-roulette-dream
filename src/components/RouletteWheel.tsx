
import { useEffect, useRef } from "react";
import { wheelItems } from "@/utils/wheelData";

interface RouletteWheelProps {
  spinning: boolean;
  spinSpeed: number;
  direction: number;
  result: number | null;
  isFullscreen: boolean;
}

export const RouletteWheel = ({ spinning, spinSpeed, direction, result, isFullscreen }: RouletteWheelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Colors for the wheel
  const colors = ["#B22222", "#000000"]; // Red and black
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions
    const size = Math.min(window.innerWidth * 0.8, 600);
    canvas.width = size;
    canvas.height = size;
    
    // Draw the roulette wheel
    drawRouletteWheel(ctx, canvas.width, canvas.height, result);
    
    // Animation variables
    let startTime: number | null = null;
    let animationFrameId: number;
    let currentRotation = 0;
    let currentSpeed = spinning ? spinSpeed * 3 : 0; // Start with high speed
    const slowdownRate = 0.98; // Rate at which the wheel slows down
    const minSpeed = 0.001; // Minimum speed before stopping
    
    // Calculate final position based on result if available
    const totalNumbers = 41;
    const anglePerSegment = (2 * Math.PI) / totalNumbers;
    let targetRotation = 0;
    
    if (result !== null && spinning) {
      // Calculate how many segments to rotate to land on the result
      // The formula ensures the wheel stops with the result at the top position
      const resultSegment = result;
      const extraRotations = 5; // Add extra rotations before stopping
      targetRotation = -(resultSegment * anglePerSegment) + Math.PI/2 + (extraRotations * 2 * Math.PI);
    }
    
    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      
      // If spinning, gradually slow down
      if (spinning) {
        // Apply slowdown only after a certain time has passed
        if (elapsed > 1000) {
          currentSpeed *= slowdownRate;
        }
        
        // Add rotation based on current speed and direction
        currentRotation += currentSpeed * direction;
        
        // If speed is very low and we have a result, snap to the target position and stop
        if (currentSpeed < minSpeed && result !== null) {
          currentRotation = targetRotation;
          drawRouletteWheel(ctx, canvas.width, canvas.height, result, currentRotation);
          return; // Stop the animation
        }
      } else {
        // If not spinning, maintain a minimum rotation or stop
        if (elapsed < 1000) {
          currentRotation += 0.01 * direction;
        }
      }
      
      // Draw the wheel with current rotation
      drawRouletteWheel(ctx, canvas.width, canvas.height, result, currentRotation);
      
      // Continue animation if spinning or if elapsed time is less than 1 second
      if (spinning || (elapsed < 1000 && !spinning)) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    // Start animation
    animationFrameId = requestAnimationFrame(animate);
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [spinning, spinSpeed, direction, result, isFullscreen]);
  
  // Function to draw the roulette wheel
  const drawRouletteWheel = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    result: number | null,
    rotation = 0
  ) => {
    const center = { x: width / 2, y: height / 2 };
    const radius = Math.min(width, height) / 2 - 10;
    const innerRadius = radius * 0.3; // Center gold part
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw the outer gold ring
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFD700"; // Gold
    ctx.fill();
    
    // Number of segments (0-40 = 41 numbers)
    const totalNumbers = 41;
    const anglePerSegment = (2 * Math.PI) / totalNumbers;
    
    // Save context state
    ctx.save();
    
    // Move to center and apply rotation
    ctx.translate(center.x, center.y);
    ctx.rotate(rotation);
    
    // Draw segments
    for (let i = 0; i < totalNumbers; i++) {
      const angle = i * anglePerSegment;
      const colorIndex = i % 2;
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius * 0.95, angle, angle + anglePerSegment);
      ctx.closePath();
      
      // Special coloring for 0 and every 10th number (Again!)
      if (i === 0 || i % 10 === 0) {
        ctx.fillStyle = "#008000"; // Green for special "Again" numbers
      } else {
        ctx.fillStyle = colors[colorIndex];
      }
      
      ctx.fill();
      
      // Add white separator lines between segments
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius * 0.95 * Math.cos(angle), radius * 0.95 * Math.sin(angle));
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // Draw inner circle (gold center)
    ctx.beginPath();
    ctx.arc(0, 0, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#CD7F32"; // Bronze
    ctx.fill();
    
    // Draw ball holders
    for (let i = 0; i < 4; i++) {
      const ballAngle = i * (Math.PI / 2);
      
      // Draw ball holder arm
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(innerRadius * 2 * Math.cos(ballAngle), innerRadius * 2 * Math.sin(ballAngle));
      ctx.strokeStyle = "#CD7F32";
      ctx.lineWidth = 10;
      ctx.stroke();
      
      // Draw ball
      ctx.beginPath();
      ctx.arc(
        innerRadius * 2 * Math.cos(ballAngle), 
        innerRadius * 2 * Math.sin(ballAngle), 
        10, 0, 2 * Math.PI
      );
      ctx.fillStyle = "#CD7F32";
      ctx.fill();
    }
    
    // Restore context state
    ctx.restore();
    
    // Add text instead of numbers
    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(rotation);
    
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    for (let i = 0; i < totalNumbers; i++) {
      const angle = i * anglePerSegment;
      const wheelItem = wheelItems[i];
      
      // Position text in the middle of the segment
      const textRadius = radius * 0.75;
      const x = textRadius * Math.cos(angle + anglePerSegment / 2);
      const y = textRadius * Math.sin(angle + anglePerSegment / 2);
      
      // Rotate text to be readable
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + anglePerSegment / 2 + Math.PI / 2);
      
      // Display different text based on fullscreen state
      ctx.fillText(isFullscreen ? wheelItem.fullscreenText : wheelItem.text, 0, 0);
      ctx.restore();
    }
    
    ctx.restore();
    
    // Draw pointer/needle at the top
    const needleSize = 20;
    
    ctx.beginPath();
    ctx.moveTo(center.x, center.y - radius - 5);
    ctx.lineTo(center.x - needleSize / 2, center.y - radius + 15);
    ctx.lineTo(center.x + needleSize / 2, center.y - radius + 15);
    ctx.closePath();
    ctx.fillStyle = "#FF0000";
    ctx.fill();
  };
  
  return (
    <div className="roulette-container relative inline-block">
      <canvas
        ref={canvasRef}
        className="rounded-full shadow-2xl"
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
};
