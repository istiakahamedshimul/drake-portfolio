"use client";

import React, { useEffect, useState, useRef } from "react";

export const BackgroundVideo: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(
    "/assets/images/video1.mp4"
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleVideoChange = (e: CustomEvent<string | null>) => {
      setVideoSrc(e.detail);
    };

    window.addEventListener(
      "drake:change_bg_video",
      handleVideoChange as EventListener
    );
    return () => {
      window.removeEventListener(
        "drake:change_bg_video",
        handleVideoChange as EventListener
      );
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [videoSrc]);

  if (!videoSrc) return null;

  return (
    <video
      ref={videoRef}
      className="body-overlay"
      muted
      autoPlay
      loop
      playsInline
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
};
