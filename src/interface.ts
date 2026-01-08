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
