import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppFacade{

  private currentUserId: string;

    public constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth){
      let user=this.fireAuth.auth.currentUser;
      if(user!=null){
          this.currentUserId= fireAuth.auth.currentUser.uid
      }else{
        this.fireAuth.auth.onAuthStateChanged((user) => {
         if (user) {
             this.currentUserId= user.uid
         }
        });
      }
    }

    public addApp(name){
      let app = {
        creator: this.currentUserId,
        name: name
      };
      return this.firestore.collection('apps').add(app);
    }

    public removeApp(id){
      this.firestore.doc('apps/'+id).delete();
    }

    public getAppById(id) {
      return this.firestore.collection('apps/'+id);
    }

    public getAppsCreatedByCurrentUser() {
      return this.firestore.collection('apps/', ref =>
        ref.where('creator', '==', this.currentUserId)
      );
    }

    public addEvaluation(appID,results){
      let evaluation = {
        app: appID,
        evaluator: this.currentUserId,
        results: results
      };
      return this.firestore.collection('evaluations').add(evaluation);
    }

    public getAppsEvaluatedByCurrentUser(){
      return this.firestore.collection('evaluations', ref =>
        ref.where('evaluator', '==', this.currentUserId)
      );
    }

}

export class App
{
  name: string;
  id: string;
  creator: string;

  public constructor(id,name,creator){
    this.id= id;
    this.name= name;
    this.creator= creator;
  }
}
