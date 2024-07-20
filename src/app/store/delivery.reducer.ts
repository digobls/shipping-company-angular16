import { createReducer, on } from '@ngrx/store';
import * as DeliveryActions from './delivery.actions';
import { Delivery } from '../models/delivery.model';

export interface DeliveryState {
  deliveries: Delivery[];
  error: any;
}

export const initialState: DeliveryState = {
  deliveries: [],
  error: null
};

export const deliveryReducer = createReducer(
  initialState,
  on(DeliveryActions.loadDeliveries, state => ({
    ...state,
    error: null
  })),
  on(DeliveryActions.loadDeliveriesSuccess, (state, { deliveries }) => ({
    ...state,
    deliveries
  })),
  on(DeliveryActions.loadDeliveriesFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
