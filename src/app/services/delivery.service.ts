import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from '../models/delivery.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiUrl = 'assets/deliveries.json';

  constructor(private http: HttpClient) {}

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiUrl);
  }
}
