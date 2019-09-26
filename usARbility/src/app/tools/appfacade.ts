import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

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

    public removeApp(appID){
      this.firestore.doc('apps/'+appID).delete();
    }

    public getAppById(appID) {
      return this.firestore.doc('apps/'+appID);
    }

    public getAppsCreatedByCurrentUser(currentUserId) {
      return this.firestore.collection('apps/', ref =>
        ref.where('creator', '==', currentUserId)
      );
    }

    public changeAppName(appID, name){
      this.firestore.doc('apps/'+appID).update({ name: name });
    }

    public changeAppActiveCriteria(appID, criteria){
      this.firestore.doc('apps/'+appID).update(
        {
          criteria: {
            0: {
              name: "perception",
              active: criteria["perception"]
            },
            1: {
              name: "ergonomics",
              active: criteria["ergonomics"]
            },
            2: {
              name: "presence",
              active: criteria["presence"]
            },
            3: {
              name: "availability",
              active: criteria["availability"]
            },
            4: {
              name: "easy",
              active: criteria["easy"]
            }
          }
        });
    }

    public getAppsEvaluatedByCurrentUser(currentUserId){
      return this.firestore.collection('apps/', ref =>
        ref.where('evaluation.'+ currentUserId+".easy", ">", -1)
      );
    }

    public addEvaluation(appID,results,currentUserId, currentUserName){
      this.firestore.doc('apps/'+appID).update(
        {
          evaluation: {
            [currentUserId]: {
              perception: results["perception"],
              ergonomics: results["ergonomics"],
              presence: results["presence"],
              availability: results["availability"],
              easy: results["easy"],
              name: currentUserName,
              comment: results["comment"]
            }
          }
        });
    }

    public removeEvaluation(appID,currentUserId){
      this.firestore.doc('apps/'+appID).update(
        {
            ['evaluation.'+currentUserId]: firebase.firestore.FieldValue.delete()
        });
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


export class Comment
{
  name: string;
  comment: string;

  public constructor(name,comment){
    this.comment= comment;
    this.name= name;
  }
}


export class CriteriaDetail
{
  name: string;
  value: number;
  valid: boolean;

  public constructor(name,value,valid){
    this.value= value;
    this.name= name;
    this.valid=valid;
  }
}
