import { Injectable } from '@angular/core';
import { Usuario } from './acesso/usuario.model';
import firebase from 'firebase/app';
import 'firebase/database'

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor() { }

  public cadastrarUsuario(usuario: Usuario) : Promise<any>{
    
   return  firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
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

  public autenticar(email: string, senha: string): void {
    console.log('email: ' , email)
    console.log('senha: ' , senha)
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((resposta: any) => { console.log(resposta) })
      .catch((erro: any) => { console.log(erro) })
  }
}
