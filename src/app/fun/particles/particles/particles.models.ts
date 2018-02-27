
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
  particleMaxWidth: 25,
  particleOpacity: 1,
  velocityX: 10,
  velocityY: 10
};

export const defaultCanvasSettings = {
  number: 5,           // number of particles
  trail: 1,            // number from 0 to 1
}
