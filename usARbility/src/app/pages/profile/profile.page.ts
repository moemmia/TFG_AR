import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private fireAuth: AngularFireAuth) { }

  email = " ";

  ngOnInit() {
    let user=this.fireAuth.auth.currentUser;
    if(user!=null){
      this.email = this.fireAuth.auth.currentUser.email;
    }else{
      this.fireAuth.auth.onAuthStateChanged((user) => {
       if (user) {
         user.email;
       }
      });
    }
  }

  resetPassword(){
    let user=this.fireAuth.auth.currentUser;
    if(user){
      this.fireAuth.auth.sendPasswordResetEmail(user.email);
    }

  }

}
