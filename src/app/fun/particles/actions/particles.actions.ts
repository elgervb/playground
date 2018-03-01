import { Action } from '@ngrx/store';
import { Particle } from '../models';

export enum ParticlesActionTypes {
  AddMany = '[AddMany] Action',
  AddOne = '[AddOne] Action'
}

export class AddMany implements Action {
  readonly type = ParticlesActionTypes.AddMany;

  constructor(public payload: Particle[]) {}
}

export class AddOne implements Action {
  readonly type = ParticlesActionTypes.AddOne;

  constructor(public payload: Particle) {}
}

export type ParticlesActions = AddMany | AddOne;
