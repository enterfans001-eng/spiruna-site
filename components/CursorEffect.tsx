"use client";
import { useEffect, useRef, useCallback } from "react";

export default function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useRef(false);
  const mouse = useRef({ x: -100, y: -100 });
  const particles = useRef<Particle[]>([]);
  const ripples = useRef<Ripple[]>([]);
  const trail = useRef<{ x: number; y: number; age: number }[]>([]);
  const rafId = useRef<number>(0);
  const isTouchDevice = useRef(false);

  const spawnRipple = useCallback((x: number, y: number) => {
    ripples.current.push({ x, y, radius: 0, opacity: 1, lineWidth: 2 });
    ripples.current.push({ x, y, radius: 0, opacity: 0.6, lineWidth: 1, delay: 4 });
    // Burst particles
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8 + (Math.random() - 0.5) * 0.3;
      const speed = 1.5 + Math.random() * 2;
      particles.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.02 + Math.random() * 0.015,
        size: 1.5 + Math.random() * 1.5,
        type: "burst",
      });
    }
    // Glitch lines
    for (let i = 0; i < 3; i++) {
      particles.current.push({
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 3,
        vy: 0,
        life: 1,
        decay: 0.04 + Math.random() * 0.02,
        size: 20 + Math.random() * 30,
        type: "glitch",
      });
    }
  }, []);

  useEffect(() => {
    // Skip on mobile/touch devices for performance
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 769) {
      isMobile.current = true;
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      trail.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (trail.current.length > 20) trail.current.shift();
      // Spawn trail particle occasionally
      if (Math.random() < 0.3) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.5 - Math.random() * 0.5,
          life: 1,
          decay: 0.025 + Math.random() * 0.015,
          size: 1 + Math.random(),
          type: "trail",
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      spawnRipple(e.clientX, e.clientY);
    };

    const handleTouch = (e: TouchEvent) => {
      isTouchDevice.current = true;
      const touch = e.touches[0] || e.changedTouches[0];
      if (touch) {
        spawnRipple(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleTouch, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ─── Cursor glow (PC only) ───
      if (!isTouchDevice.current) {
        const mx = mouse.current.x;
        const my = mouse.current.y;

        // Outer glow
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 80);
        glow.addColorStop(0, "rgba(255, 0, 51, 0.06)");
        glow.addColorStop(0.5, "rgba(255, 0, 51, 0.02)");
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(mx - 80, my - 80, 160, 160);

        // Cross-hair lines
        ctx.strokeStyle = "rgba(255, 0, 51, 0.12)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(mx - 12, my);
        ctx.lineTo(mx - 4, my);
        ctx.moveTo(mx + 4, my);
        ctx.lineTo(mx + 12, my);
        ctx.moveTo(mx, my - 12);
        ctx.lineTo(mx, my - 4);
        ctx.moveTo(mx, my + 4);
        ctx.lineTo(mx, my + 12);
        ctx.stroke();

        // Small center dot
        ctx.fillStyle = "rgba(255, 0, 51, 0.4)";
        ctx.beginPath();
        ctx.arc(mx, my, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Trail line
        if (trail.current.length > 2) {
          ctx.beginPath();
          ctx.moveTo(trail.current[0].x, trail.current[0].y);
          for (let i = 1; i < trail.current.length; i++) {
            const p = trail.current[i];
            ctx.lineTo(p.x, p.y);
          }
          ctx.strokeStyle = "rgba(255, 0, 51, 0.08)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Age trail points
      trail.current = trail.current.filter((p) => {
        p.age++;
        return p.age < 15;
      });

      // ─── Particles ───
      particles.current = particles.current.filter((p) => {
        p.life -= p.decay;
        if (p.life <= 0) return false;

        p.x += p.vx;
        p.y += p.vy;

        if (p.type === "trail") {
          ctx.fillStyle = `rgba(255, 0, 51, ${p.life * 0.5})`;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        } else if (p.type === "burst") {
          ctx.fillStyle = `rgba(0, 240, 255, ${p.life * 0.8})`;
          ctx.shadowColor = "rgba(0, 240, 255, 0.5)";
          ctx.shadowBlur = 4;
          ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
          ctx.shadowBlur = 0;
        } else if (p.type === "glitch") {
          ctx.fillStyle = `rgba(255, 0, 51, ${p.life * 0.3})`;
          ctx.fillRect(p.x - p.size / 2, p.y - 0.5, p.size, 1);
        }

        return true;
      });

      // ─── Ripples ───
      ripples.current = ripples.current.filter((r) => {
        if (r.delay && r.delay > 0) {
          r.delay--;
          return true;
        }
        r.radius += 3;
        r.opacity -= 0.025;
        if (r.opacity <= 0) return false;

        // Hex-style ripple (octagon)
        ctx.strokeStyle = `rgba(0, 240, 255, ${r.opacity * 0.6})`;
        ctx.lineWidth = r.lineWidth;
        ctx.beginPath();
        const sides = 8;
        for (let i = 0; i <= sides; i++) {
          const angle = (Math.PI * 2 * i) / sides - Math.PI / 8;
          const px = r.x + Math.cos(angle) * r.radius;
          const py = r.y + Math.sin(angle) * r.radius;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        // Inner circle
        if (r.radius < 30) {
          ctx.strokeStyle = `rgba(255, 0, 51, ${r.opacity * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.4, 0, Math.PI * 2);
          ctx.stroke();
        }

        return true;
      });

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [spawnRipple]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        pointerEvents: "none",
      }}
    />
  );
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
  type: "trail" | "burst" | "glitch";
};

type Ripple = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  lineWidth: number;
  delay?: number;
};
