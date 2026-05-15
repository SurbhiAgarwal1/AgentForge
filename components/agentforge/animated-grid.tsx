'use client';

import React, { useEffect, useRef } from 'react';

interface AnimatedGridProps {
  className?: string;
}

export function AnimatedGrid({ className }: AnimatedGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;

    const drawGrid = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gridSize = 60;
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      // Draw vertical lines
      for (let i = 0; i < cols; i++) {
        const x = i * gridSize;
        const opacity = 0.03 + 0.02 * Math.sin(time * 0.5 + i * 0.1);

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let i = 0; i < rows; i++) {
        const y = i * gridSize;
        const opacity = 0.03 + 0.02 * Math.sin(time * 0.5 + i * 0.1);

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw intersection points
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          const dist = Math.sin(time * 0.3 + i * 0.2 + j * 0.2);
          const dotOpacity = 0.05 + 0.05 * dist;

          if (dotOpacity > 0.06) {
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(6, 182, 212, ${dotOpacity})`;
            ctx.fill();
          }
        }
      }

      time += 0.016;
      animationFrameRef.current = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 ${className ?? ''}`}
      style={{ opacity: 0.6 }}
    />
  );
}
