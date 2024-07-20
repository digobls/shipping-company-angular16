import { createAction, props } from '@ngrx/store';
import { Delivery } from '../models/delivery.model';

export const loadDeliveries = createAction('[Delivery] Load Deliveries');
export const loadDeliveriesSuccess = createAction('[Delivery] Load Deliveries Success', props<{ deliveries: Delivery[] }>());
export const loadDeliveriesFailure = createAction('[Delivery] Load Deliveries Failure', props<{ error: any }>());
