import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/storage'
import { ProgressoService } from './progresso.service';



@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor(private progressoService: ProgressoService) { }

  public publicar(publicacao: any): void {
   
    let nomeImagem = Date.now()

    firebase.storage().ref()
      .child(`imagens/${nomeImagem}`)
      .put(publicacao.imagem)
      .on(firebase.storage.TaskEvent.STATE_CHANGED,
        //acompanhamento do progreso do upload
        (snapshot: any) => {
          this.progressoService.status ='andamento'
          this.progressoService.estado = snapshot
         // console.log('Snapshot capturado no on(): ', snapshot)
        }, (error) => {
          this.progressoService.status ='erro'
        },() =>{
          //Finalização do progresso
          this.progressoService.status ='concluido'
        }
      )

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
  }
}
