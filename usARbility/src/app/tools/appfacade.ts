import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppFacade{

    public constructor(private firestore: AngularFirestore){ }

    public addApp(name,currentUserId){
      let app = {
        creator: currentUserId,
        name: name
      };
      return this.firestore.collection('apps').add(app);
    }

    public removeApp(id){
      this.firestore.doc('apps/'+id).delete();
    }

    public getAppById(id) {
      return this.firestore.doc('apps/'+id);
    }

    public getAppsCreatedByCurrentUser(currentUserId) {
      return this.firestore.collection('apps/', ref =>
        ref.where('creator', '==', currentUserId)
      );
    }

    public addEvaluation(appID,results,currentUserId){
      let evaluation = {
        app: appID,
        evaluator: currentUserId,
        results: results
      };
      return this.firestore.collection('evaluations').add(evaluation);
    }

    public getAppsEvaluatedByCurrentUser(currentUserId){
      return this.firestore.collection('evaluations', ref =>
        ref.where('evaluator', '==', currentUserId)
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
