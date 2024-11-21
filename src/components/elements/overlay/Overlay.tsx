// Overlay.tsx
import React from "react";

type OverlayProps = {
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
};

export function Overlay({ isOpen, onClose, children }: OverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 backdrop-blur-sm">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
      />
      {children}
    </div>
  );
}
