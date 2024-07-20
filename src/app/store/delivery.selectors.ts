import { AppStore } from './app.store';
import { createSelector } from '@ngrx/store';
import { DeliveryState } from './delivery.reducer';

export const selectDeliveriesState = (state: AppStore) => state.delivery;

export const selectAllDeliveries = createSelector(
  selectDeliveriesState,
  (state: DeliveryState) => state.deliveries
);

export const selectDeliveriesByDriver = createSelector(
  selectDeliveriesState,
  (deliveryState: DeliveryState) => {
    const deliveries = deliveryState.deliveries;
    const drivers = new Map<string, { total: number, completed: number }>();

    deliveries.forEach(delivery => {
      const driver = delivery.motorista.nome;
      if (!drivers.has(driver)) {
        drivers.set(driver, { total: 0, completed: 0 });
      }
      const driverData = drivers.get(driver)!;
      driverData.total++;
      if (delivery.status_entrega === 'ENTREGUE') {
        driverData.completed++;
      }
    });

    return Array.from(drivers.entries()).map(([name, { total, completed }]) => ({
      name,
      total,
      completed
    }));
  }
);

export const selectFailedDeliveriesByDriver = createSelector(
  selectDeliveriesState,
  (deliveryState: DeliveryState) => {
    const deliveries = deliveryState.deliveries;
    const drivers = new Map<string, number>();

    deliveries.forEach(delivery => {
      if (delivery.status_entrega === 'INSUCESSO') {
        const driver = delivery.motorista.nome;
        if (!drivers.has(driver)) {
          drivers.set(driver, 0);
        }
        drivers.set(driver, drivers.get(driver)! + 1);
      }
    });

    return Array.from(drivers.entries()).map(([name, count]) => ({
      name,
      count
    }));
  }
);

export const selectDeliveriesByNeighborhood = createSelector(
  selectDeliveriesState,
  (deliveryState: DeliveryState) => {
    const deliveries = deliveryState.deliveries;
    const neighborhoods = new Map<string, { total: number, completed: number }>();

    deliveries.forEach(delivery => {
      const neighborhood = delivery.cliente_destino.bairro;
      if (!neighborhoods.has(neighborhood)) {
        neighborhoods.set(neighborhood, { total: 0, completed: 0 });
      }
      const neighborhoodData = neighborhoods.get(neighborhood)!;
      neighborhoodData.total++;
      if (delivery.status_entrega === 'ENTREGUE') {
        neighborhoodData.completed++;
      }
    });

    return Array.from(neighborhoods.entries()).map(([name, { total, completed }]) => ({
      name,
      total,
      completed
    }));
  }
);
