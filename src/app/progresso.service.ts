import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressoService {

  public status: string
  public estado: any

  constructor() { }
}
