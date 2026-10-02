"use client";

import React, { useEffect } from "react";

interface LightboxModalProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  imageUrl,
  title,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="portfolio-lightbox-modal" onClick={onClose}>
      <div
        className="portfolio-lightbox-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="portfolio-lightbox-close"
          onClick={onClose}
          aria-label="Close image preview"
        >
          <i className="las la-times"></i>
        </button>
        <img src={imageUrl} alt={title} />
        {title && <div className="portfolio-lightbox-caption">{title}</div>}
      </div>
    </div>
  );
};
