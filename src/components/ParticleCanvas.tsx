'use client';

import React, { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Warm botanical & golden tones matching the wedding palette
    const colors = [
      'rgba(184, 151, 88, 0.45)',  // Warm Gold
      'rgba(140, 109, 82, 0.35)',  // Caramel Dried Petal
      'rgba(197, 168, 105, 0.40)', // Champagne Gold
      'rgba(245, 239, 230, 0.55)', // Soft Ivory Glimmer
      'rgba(166, 91, 68, 0.25)',   // Muted Terracotta
    ];

    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedY: number = 0;
      speedX: number = 0;
      color: string = '';
      angle: number = 0;
      angleSpeed: number = 0;
      sway: number = 0;
      swaySpeed: number = 0;
      swayWidth: number = 0;
      isSparkle: boolean = false;

      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = init ? Math.random() * canvas.height : -25;
        this.isSparkle = Math.random() > 0.65;
        this.size = this.isSparkle ? Math.random() * 3 + 1.5 : Math.random() * 8 + 4;
        this.speedY = Math.random() * 0.55 + 0.25;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = Math.random() * 0.015 - 0.0075;
        this.sway = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.018 + 0.008;
        this.swayWidth = Math.random() * 0.6 + 0.2;
      }

      update() {
        if (!canvas) return;
        this.y += this.speedY;
        this.sway += this.swaySpeed;
        this.x += this.speedX + Math.sin(this.sway) * this.swayWidth;
        this.angle += this.angleSpeed;

        if (this.y > canvas.height + 25 || this.x < -25 || this.x > canvas.width + 25) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.beginPath();
        if (this.isSparkle) {
          // Subtle four-pointed star / sparkle
          const s = this.size;
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
        } else {
          // Elegant dried floral petal
          ctx.moveTo(0, -this.size);
          ctx.quadraticCurveTo(this.size * 0.55, -this.size * 0.2, 0, this.size);
          ctx.quadraticCurveTo(-this.size * 0.55, -this.size * 0.2, 0, -this.size);
        }

        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const particleCount = 38;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
