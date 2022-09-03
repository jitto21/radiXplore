import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {

  private mapData: {[key: string]: string} = {};
  mapDataSubject = new BehaviorSubject<{[key: string]: string} | null>(null);

  constructor() { }

  setMapData(data: {[key: string]: string}) {
    this.mapData = data;
    this.mapDataSubject.next(this.mapData);
  }

  getMapData() {
    return this.mapDataSubject.asObservable();
  }

}
