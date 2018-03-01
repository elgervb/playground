import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromParticles from './particles';
import * as fromRoot from '../../../reducers';

export interface ParticlesState {
  particles: fromParticles.State
}

export interface State extends fromRoot.AppState {
  particles: ParticlesState
}

export const reducers: ActionReducerMap<ParticlesState> = {
  particles: fromParticles.reducer
};

export const getParticlesState = createFeatureSelector<ParticlesState>('particles');

export const getParticlesEntitiesState = createSelector(
  getParticlesState,
  state => state.particles
);

export const {
  selectIds: getParticlesIds,
  selectEntities: getParticlesEntities,
  selectAll: getAllParticles,
  selectTotal: getTotalParticles,
} = fromParticles.adapter.getSelectors(getParticlesEntitiesState);

