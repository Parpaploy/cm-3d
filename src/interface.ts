import type { Vector3 } from "three";
import type { ComponentType } from "react";

export type AnimationType = "idle" | "run" | "attack" | "anim" | "none";

export interface HittestARProps {
  defaultScale?: number;
  onReticleVisible?: () => void;
  onModelPlaced?: (isPlaced: boolean) => void;
}

export interface ModelState {
  id: number;
  position: Vector3;
  animation?: AnimationType;
}

export interface HitTestARProps {
  model: ComponentType<{
    position: Vector3;
    rotation: [number, number, number];
    scale: number;
    animation?: AnimationType;
  }>;
  defaultAnimation?: AnimationType;
  defaultScale?: number;
  onReticleVisible?: () => void;
  onModelPlaced?: (placed: boolean) => void;
}

export interface ARSessionInit {
  requiredFeatures: string[];
  optionalFeatures?: string[];
  domOverlay?: {
    root: HTMLElement;
  };
}

export interface MarkerlessProps {
  defaultScale?: number;
  onReticleVisible?: () => void;
  resetTrigger?: number;
  onModelPlaced?: (position: Vector3) => void;
}

export interface ArProps {
  rotation: [number, number, number];
  position: [number, number, number];
  scale: number;
  rotation2: [number, number, number];
  position2: [number, number, number];
  scale2: number;
  isOpen: boolean;
}
