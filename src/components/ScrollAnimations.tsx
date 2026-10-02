"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const ScrollAnimations: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Give DOM a tick to hydrate and settle layout
    const ctx = gsap.context(() => {
      const boxes = document.querySelectorAll(".scroll-animation");

      boxes.forEach((box) => {
        const el = box as HTMLElement;
        const animationType = el.dataset.animation || "fade_from_bottom";
        const duration = parseFloat(el.dataset.animationDuration || "1.2");

        let fromProps: gsap.TweenVars = {
          duration,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top bottom+=15%",
            toggleActions: "play none none reverse",
          },
        };

        switch (animationType) {
          case "fade_from_bottom":
            fromProps = { ...fromProps, y: 120, opacity: 0 };
            break;
          case "fade_from_top":
            fromProps = { ...fromProps, y: -120, opacity: 0 };
            break;
          case "fade_from_left":
            fromProps = { ...fromProps, x: -120, opacity: 0 };
            break;
          case "fade_from_right":
            fromProps = { ...fromProps, x: 120, opacity: 0 };
            break;
          case "fade_in":
            fromProps = { ...fromProps, opacity: 0 };
            break;
          case "rotate_up":
            fromProps = { ...fromProps, y: 120, rotation: 10, opacity: 0 };
            break;
          default:
            fromProps = { ...fromProps, y: 120, opacity: 0 };
        }

        gsap.from(el, fromProps);
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
};
