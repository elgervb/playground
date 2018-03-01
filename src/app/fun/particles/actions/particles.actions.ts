import { Action } from '@ngrx/store';
import { Particle } from '../models';

export enum ParticlesActionTypes {
  AddMany = '[AddMany] Action',
  AddOne = '[AddOne] Action',
  Create = '[Create] Action'
}

export class AddMany implements Action {
  readonly type = ParticlesActionTypes.AddMany;

  constructor(public payload: Particle[]) {}
}

export class AddOne implements Action {
  readonly type = ParticlesActionTypes.AddOne;

  constructor(public payload: Particle) {}
}

export class Create implements Action {
  readonly type = ParticlesActionTypes.Create;

  constructor(public payload: number = 1, public containerWidth: number, public containerHeight: number) {}
}

export type ParticlesActions = AddMany | AddOne | Create;
