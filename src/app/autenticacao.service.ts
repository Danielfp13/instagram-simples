import { Injectable } from '@angular/core';
import { Usuario } from './acesso/usuario.model';
import firebase from 'firebase/app';
import 'firebase/database'

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor() { }

  public cadastrarUsuario(usuario: Usuario) {
    console.log('Chegamos até o serviço!!!', usuario)
    firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha )
      .then(
        (resposta: any) => {
        //remover a senha do aributo senha do objeto usuário
        delete usuario.senha

          //registrando dados complementares do usuariono path email na base64
          firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`).set(usuario)

        })
      .catch((error: Error) => {
        console.log(error)
      })
  }
}
