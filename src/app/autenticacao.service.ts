import { Injectable } from '@angular/core';
import { Usuario } from './acesso/usuario.model';
import firebase from 'firebase/app';
import 'firebase/database'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  public token_id: string;

  constructor(private router: Router) { }

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

    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((resposta: any) => { 
        firebase.auth().currentUser.getIdToken()
        .then((idToken: string) => {
          this.token_id = idToken
          console.log(this.token_id)
          this.router.navigate(['/home'])
        })
      })
      .catch((erro: any) => { console.log(erro) })
  }

  public autenticado(): boolean {
    return this.token_id !== undefined
  }
  
}
