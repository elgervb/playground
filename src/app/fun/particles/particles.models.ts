
export interface Particle {
  x: number,
  y: number,
  radius: number,
  vx: number,
  vy: number,
  color: string,
}


export const defaultParticleSettings = {
  particleBlur: 1,     // number from 0 to 1 where 1 is no blur
  particleMinWidth: 5,
  particleMaxWidth: 50,
  particleOpacity: 1,
  velocity: 5,
};

export interface CanvasSettings {
  number: number,
  trail: number;
}

export const defaultCanvasSettings: CanvasSettings = {
  number: 100,           // number of particles
  trail: 1,            // number from 0 to 1
}
