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
        name: name,
        criteria: {
          0: {
            name: "perception",
            active: true
          },
          1: {
            name: "ergonomics",
            active: true
          },
          2: {
            name: "presence",
            active: true
          },
          3: {
            name: "availability",
            active: true
          },
          4: {
            name: "easy",
            active: true
          }
        },
        evaluation:{

        }
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

    public changeAppName(id, name){
      this.firestore.doc('apps/'+id).update({ name: name });
    }

    public changeAppActiveCriteria(id, criteria){
      this.firestore.doc('apps/'+id).update(
        {
          criteria: {
            0: {
              name: "perception",
              value: 0,
              active: criteria["perception"]
            },
            1: {
              name: "ergonomics",
              value: 0,
              active: criteria["ergonomics"]
            },
            2: {
              name: "presence",
              value: 0,
              active: criteria["presence"]
            },
            3: {
              name: "availability",
              value: 0,
              active: criteria["availability"]
            },
            4: {
              name: "easy",
              value: 0,
              active: criteria["easy"]
            }
          }
        });
    }

    public addEvaluation(appID,results,currentUserId){

    }

    public getAppsEvaluatedByCurrentUser(currentUserId){

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
