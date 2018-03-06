import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Particle } from '../models';

export enum ParticlesActionTypes {
  AddMany = '[AddMany] Action',
  AddOne = '[AddOne] Action',
  Create = '[Create] Action',
  Delete = '[Delete] Action',
  UpdateAll = '[UpdateAll] Action'
}

export class AddMany implements Action {
  readonly type = ParticlesActionTypes.AddMany;

  constructor(public payload: Particle[]) {}
}

export class AddOne implements Action {
  readonly type = ParticlesActionTypes.AddOne;

  constructor(public payload: Particle) {}
}

export class UpdateAll implements Action {
  readonly type = ParticlesActionTypes.UpdateAll;

  constructor(public payload: Update<Particle>[]){}
}

export class Create implements Action {
  readonly type = ParticlesActionTypes.Create;

  constructor(public payload: number = 1, public containerWidth: number, public containerHeight: number) {}
}

export class Delete implements Action {
  readonly type = ParticlesActionTypes.Delete;

  constructor(public payload: Particle) {
}
}

export type ParticlesActions = AddMany | AddOne | Create | UpdateAll | Delete;
