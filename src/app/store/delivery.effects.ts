import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DeliveryService } from '../services/delivery.service';
import * as DeliveryActions from './delivery.actions';

@Injectable()
export class DeliveryEffects {
  loadDeliveries$ = createEffect(() => this.actions$.pipe(
    ofType(DeliveryActions.loadDeliveries),
    mergeMap(() => this.deliveryService.getDeliveries().pipe(
      map(deliveries => DeliveryActions.loadDeliveriesSuccess({ deliveries })),
      catchError(error => of(DeliveryActions.loadDeliveriesFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private deliveryService: DeliveryService
  ) {}
}
