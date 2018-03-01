import { Action } from '@ngrx/store';
import { ParticlesActions, ParticlesActionTypes } from '../actions/particles.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Particle } from '../models/'

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

    default:
      return state;
  }
}
