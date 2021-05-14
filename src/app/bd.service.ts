import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/database'


@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor() { }

  public publicar(publicacao: any): void{
    console.log(publicacao)
   firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
   .push( { titulo: publicacao.titulo })
  }
}
