import { Action } from '@ngrx/store';
import { ParticlesActions, ParticlesActionTypes } from '../actions/particles.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Particle, defaultParticleSettings } from '../models'

export interface State extends EntityState<Particle> {

}

export const adapter = createEntityAdapter<Particle>({
  selectId: (particle: Particle) => particle.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({});

export function reducer(state = initialState, action: ParticlesActions): State {
  switch (action.type) {

    case ParticlesActionTypes.AddMany:
      return adapter.addMany(action.payload, {
        ...state
      });

    case ParticlesActionTypes.AddOne:
      return adapter.addOne(action.payload, {
        ...state
      });

    case ParticlesActionTypes.Create:
      if (action.payload === 1) {
        return adapter.addOne(createParticle(action.containerWidth, action.containerHeight), {
          ...state
        });
      }
      const particles = [];
      for (let i = 0; i < action.payload; i++) {
        particles.push(createParticle(action.containerWidth, action.containerHeight));
      }
      return adapter.addAll(particles, {
        ...state
      });

    case ParticlesActionTypes.Delete:
      return adapter.removeOne(action.payload.id, {...state});

    case ParticlesActionTypes.UpdateAll:
      return adapter.updateMany(action.payload, {
        ...state
      });

    default:
      return state;
  }
}

export function createParticle(containerWidth: number, containerHeight: number) {
  // radius
  const radius = Math.random()*defaultParticleSettings.particleMaxWidth+defaultParticleSettings.particleMinWidth;
  // position
  const x = Math.max(radius+1, Math.min(containerWidth - radius, Math.random() * containerWidth));
  const y = Math.max(radius+1, Math.min(containerHeight - radius, Math.random() * containerHeight));
  // velocity
  const vx = Math.random()*defaultParticleSettings.velocity + ((defaultParticleSettings.velocity / 2) * -1);
  const vy = Math.random()*defaultParticleSettings.velocity + ((defaultParticleSettings.velocity / 2) * -1);
  // color
  const color = randomColor();

  return {color, radius, x, y, vx, vy, id: guid() }
}

export function guid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  })
}

export function randomColor(): string {
  const r = Math.random()*255>>0;
  const g = Math.random()*255>>0;
  const b = Math.random()*255>>0;
  return `rgba(${r}, ${g}, ${b}, ${defaultParticleSettings.particleOpacity})`;
}
