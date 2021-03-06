import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/storage'
import { promise } from 'protractor';
import { ProgressoService } from './progresso.service';



@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor(private progressoService: ProgressoService) { }

  public publicar(publicacao: any): void {

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
      .then((resposta: any) => {
        let nomeImagem = resposta.key

        firebase.storage().ref()
          .child(`imagens/${nomeImagem}`)
          .put(publicacao.imagem)
          .on(firebase.storage.TaskEvent.STATE_CHANGED,
            //acompanhamento do progreso do upload
            (snapshot: any) => {
              this.progressoService.status = 'andamento'
              this.progressoService.estado = snapshot
            }, (error) => {
              this.progressoService.status = 'erro'
            }, () => {
              //Finalização do progresso
              this.progressoService.status = 'concluido'
            }
          )
      })
  }

  public consultaPublicacoes(emailUsuario: string): Promise<any> {
    return new Promise((resolve, reject) => {

      //consultar as publicações em (database) 
      firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {

          let publicacoes: any[] = []

          snapshot.forEach((childSnapshot: any) => {
            let publicacao = childSnapshot.val()
            publicacao.key = childSnapshot.key

            publicacoes.push(publicacao)
          })

          return publicacoes.reverse()
        })
        .then((publicacoes: any) => {
          publicacoes.forEach((publicacao: any) => {
            //consultar url da imagem em (storage)
            firebase.storage().ref()
              .child(`imagens/${publicacao.key}`)
              .getDownloadURL()
              .then((url: string) => {
                publicacao.url_imagem = url

                //consultar nome do usuario
                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                  .once('value')
                  .then((snapshot: any) => {
                    publicacao.nome_usuario = snapshot.val().nome_usuario
                  })
              })
          })
          resolve(publicacoes)
        })
    })
  }
}
