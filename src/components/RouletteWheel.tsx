
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
  
  // Cores para a roleta
  const colors = ["#B22222", "#000000"]; // Vermelho e preto
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Definir dimensões do canvas - maior no modo fullscreen
    const size = isFullscreen 
      ? Math.min(window.innerWidth * 0.9, window.innerHeight * 0.9, 900)
      : Math.min(window.innerWidth * 0.8, 600);
    
    canvas.width = size;
    canvas.height = size;
    
    // Desenhar a roleta
    drawRouletteWheel(ctx, canvas.width, canvas.height, result);
    
    // Variáveis de animação
    let startTime: number | null = null;
    let animationFrameId: number;
    let currentRotation = 0;
    let currentSpeed = spinning ? spinSpeed * 3 : 0; // Iniciar com velocidade alta
    const slowdownRate = 0.98; // Taxa de desaceleração
    const minSpeed = 0.001; // Velocidade mínima antes de parar
    
    // Calcular posição final baseada no resultado se disponível
    const totalNumbers = wheelItems.length;
    const anglePerSegment = (2 * Math.PI) / totalNumbers;
    let targetRotation = 0;
    
    if (result !== null && spinning) {
      // Calcular quantos segmentos girar para parar no resultado
      const resultSegment = result;
      const extraRotations = 5; // Rotações extras antes de parar
      targetRotation = -(resultSegment * anglePerSegment) + Math.PI/2 + (extraRotations * 2 * Math.PI);
    }
    
    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      
      // Se girando, desacelerar gradualmente
      if (spinning) {
        // Aplicar desaceleração após um certo tempo
        if (elapsed > 1000) {
          currentSpeed *= slowdownRate;
        }
        
        // Adicionar rotação baseada na velocidade atual e direção
        currentRotation += currentSpeed * direction;
        
        // Se a velocidade for muito baixa e temos um resultado, ir para a posição alvo e parar
        if (currentSpeed < minSpeed && result !== null) {
          currentRotation = targetRotation;
          drawRouletteWheel(ctx, canvas.width, canvas.height, result, currentRotation);
          return; // Parar a animação
        }
      } else {
        // Se não estiver girando, manter rotação mínima ou parar
        if (elapsed < 1000) {
          currentRotation += 0.01 * direction;
        }
      }
      
      // Desenhar a roleta com a rotação atual
      drawRouletteWheel(ctx, canvas.width, canvas.height, result, currentRotation);
      
      // Continuar animação se girando ou se o tempo decorrido for menor que 1 segundo
      if (spinning || (elapsed < 1000 && !spinning)) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    // Iniciar animação
    animationFrameId = requestAnimationFrame(animate);
    
    // Limpar
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [spinning, spinSpeed, direction, result, isFullscreen]);
  
  // Função para desenhar a roleta
  const drawRouletteWheel = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    result: number | null,
    rotation = 0
  ) => {
    const center = { x: width / 2, y: height / 2 };
    const radius = Math.min(width, height) / 2 - 10;
    const innerRadius = radius * 0.3; // Parte central dourada
    
    ctx.clearRect(0, 0, width, height);
    
    // Desenhar o anel externo dourado
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFD700"; // Dourado
    ctx.fill();
    
    // Número de segmentos (igual ao número de itens na wheelItems)
    const totalNumbers = wheelItems.length;
    const anglePerSegment = (2 * Math.PI) / totalNumbers;
    
    // Salvar estado do contexto
    ctx.save();
    
    // Mover para o centro e aplicar rotação
    ctx.translate(center.x, center.y);
    ctx.rotate(rotation);
    
    // Desenhar segmentos
    for (let i = 0; i < totalNumbers; i++) {
      const angle = i * anglePerSegment;
      const colorIndex = i % 2;
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius * 0.95, angle, angle + anglePerSegment);
      ctx.closePath();
      
      // Coloração especial para posições "AGAIN" (a cada 4 posições começando do 0)
      if (i === 0 || i === 4 || i === 8 || i === 12 || i === 16 || i === 20 || i === 24 || i === 28 || i === 32) {
        ctx.fillStyle = "#008000"; // Verde para "Again"
      } else {
        ctx.fillStyle = colors[colorIndex];
      }
      
      ctx.fill();
      
      // Adicionar linhas separadoras brancas entre segmentos
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius * 0.95 * Math.cos(angle), radius * 0.95 * Math.sin(angle));
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // Desenhar círculo interno (centro dourado)
    ctx.beginPath();
    ctx.arc(0, 0, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#CD7F32"; // Bronze
    ctx.fill();
    
    // Desenhar suportes de bola
    for (let i = 0; i < 4; i++) {
      const ballAngle = i * (Math.PI / 2);
      
      // Desenhar braço do suporte da bola
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(innerRadius * 2 * Math.cos(ballAngle), innerRadius * 2 * Math.sin(ballAngle));
      ctx.strokeStyle = "#CD7F32";
      ctx.lineWidth = 10;
      ctx.stroke();
      
      // Desenhar bola
      ctx.beginPath();
      ctx.arc(
        innerRadius * 2 * Math.cos(ballAngle), 
        innerRadius * 2 * Math.sin(ballAngle), 
        10, 0, 2 * Math.PI
      );
      ctx.fillStyle = "#CD7F32";
      ctx.fill();
    }
    
    // Restaurar estado do contexto
    ctx.restore();
    
    // Adicionar faixa cinza semi-transparente para os números - posicionada mais para fora
    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(rotation);
    
    // Faixa mais fina e mais próxima da borda para melhor uso do espaço
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.90, 0, 2 * Math.PI); // Aumentar raio externo (mais próximo da borda)
    ctx.arc(0, 0, radius * 0.80, 0, 2 * Math.PI, true); // Faixa mais fina
    ctx.fillStyle = "rgba(200, 200, 200, 0.7)";
    ctx.fill();
    
    ctx.restore();
    
    // Adicionar texto com visibilidade e posicionamento melhorados
    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(rotation);
    
    // Fonte menor no fullscreen para caber melhor nos segmentos
    const fontSize = isFullscreen ? 22 : 20;
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    for (let i = 0; i < totalNumbers; i++) {
      const angle = i * anglePerSegment;
      const wheelItem = wheelItems[i];
      
      // Posicionar texto mais perto da borda da roleta para aproveitar melhor o espaço
      const textRadius = radius * 0.85; // Ainda mais próximo da borda
      const x = textRadius * Math.cos(angle + anglePerSegment / 2);
      const y = textRadius * Math.sin(angle + anglePerSegment / 2);
      
      // Rotacionar texto para ser legível
      ctx.save();
      ctx.translate(x, y);
      
      // Ajustar a rotação do texto para que seja sempre legível
      let textAngle = angle + anglePerSegment / 2;
      if (textAngle > Math.PI / 2 && textAngle < Math.PI * 3 / 2) {
        // Texto na metade inferior: girar para ficar de cabeça para baixo
        ctx.rotate(textAngle + Math.PI);
      } else {
        // Texto na metade superior: rotação normal
        ctx.rotate(textAngle);
      }
      
      // Texto grande e contrastante para melhor legibilidade
      const displayText = wheelItem.text;
      
      // Adicionar borda preta ao texto para maior legibilidade
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = isFullscreen ? 2 : 2; // Borda mais fina para texto menor
      ctx.strokeText(displayText, 0, 0);
      
      // Texto em preto para "AGAIN" e branco para números
      if (displayText === "AGAIN" || displayText === "AG") {
        // Texto para "AGAIN" em preto
        ctx.fillStyle = "#000000";
      } else {
        // Texto para números em branco
        ctx.fillStyle = "#FFFFFF";
      }
      
      ctx.fillText(displayText, 0, 0);
      ctx.restore();
    }
    
    ctx.restore();
    
    // Desenhar ponteiro/agulha no topo
    const needleSize = isFullscreen ? 40 : 20; // Maior no modo fullscreen
    
    ctx.beginPath();
    ctx.moveTo(center.x, center.y - radius - 5);
    ctx.lineTo(center.x - needleSize / 2, center.y - radius + 15);
    ctx.lineTo(center.x + needleSize / 2, center.y - radius + 15);
    ctx.closePath();
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    
    // Adicionar contorno preto ao redor do ponteiro para melhor visibilidade
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.stroke();
  };
  
  return (
    <div className={`roulette-container relative ${isFullscreen ? 'flex items-center justify-center w-full h-full' : 'inline-block'}`}>
      <canvas
        ref={canvasRef}
        className="rounded-full shadow-2xl"
        style={{ 
          maxWidth: isFullscreen ? "none" : "100%",
          width: isFullscreen ? "auto" : "100%",
          height: isFullscreen ? "90vh" : "auto"
        }}
      />
    </div>
  );
};

