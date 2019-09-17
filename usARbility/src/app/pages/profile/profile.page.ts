import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private fireAuth: AngularFireAuth, private alertController: AlertController) {
    let user=this.fireAuth.auth.currentUser;
    if(user!=null){
      this.email = this.fireAuth.auth.currentUser.email;
    }else{
      this.fireAuth.auth.onAuthStateChanged((user) => {
       if (user) {
         this.email = user.email;
       }
      });
    }
  }

  email = " ";

  ngOnInit() {

  }

  resetPassword(){
    let user=this.fireAuth.auth.currentUser;
    if(user){
      this.fireAuth.auth.sendPasswordResetEmail(user.email);
      this.showMessage("An email has been sended to "+ this.email,"Well Done");
    }
  }

  async showMessage(error,header){
     const alert = await this.alertController.create({
      header: header,
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }

  async deleteAccount(){
    const alert = await this.alertController.create({
      header: 'Account Deletion',
      message: 'Are you sure you want to delete your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Confirm',
          handler: (ref) => {
            this.showMessage("Not Yet Implemented","Error");
          }
        }
      ]
    });
    await alert.present();
  }


}
