import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { foundation } from '../../environments/environment';

@Injectable()
export class AppFacade{

    public constructor(private firestore: AngularFirestore){ }

    public addApp(name,currentUserId){
      let app = {
        creator: currentUserId,
        name: name,
        criteria: {
          0: {
            name: foundation.perception,
            active: true
          },
          1: {
            name: foundation.ergonomics,
            active: true
          },
          2: {
            name: foundation.presence,
            active: true
          },
          3: {
            name: foundation.availability,
            active: true
          },
          4: {
            name: foundation.easy,
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

    public getEvaluation() {
      return this.firestore.collection('evaluation/');
    }

    public changeAppName(appID, name){
      this.firestore.doc('apps/'+appID).update({ name: name });
    }

    public changeAppActiveCriteria(appID, criteria){
      this.firestore.doc('apps/'+appID).update(
        {
          criteria: {
            0: {
              name: foundation.perception,
              active: criteria[foundation.perception]
            },
            1: {
              name: foundation.ergonomics,
              active: criteria[foundation.ergonomics]
            },
            2: {
              name: foundation.presence,
              active: criteria[foundation.presence]
            },
            3: {
              name: foundation.availability,
              active: criteria[foundation.availability]
            },
            4: {
              name: foundation.easy,
              active: criteria[foundation.easy]
            }
          }
        });
    }

    public getAppsEvaluatedByCurrentUser(currentUserId){
      return this.firestore.collection('apps/', ref =>
        ref.where('evaluation.'+ currentUserId+".date", "<=", new Date())
      );
    }

    public addEvaluation(appID,results,currentUserId, currentUserName){
      this.firestore.doc('apps/'+appID).update(
        {
          ['evaluation.'+currentUserId]: {
              perception: results[foundation.perception],
              ergonomics: results[foundation.ergonomics],
              presence: results[foundation.presence],
              availability: results[foundation.availability],
              easy: results[foundation.easy],
              name: currentUserName,
              comment: results[foundation.comment],
              date: firebase.firestore.FieldValue.serverTimestamp()
            }
          }
        );
    }

    public removeEvaluation(appID,currentUserId){
      this.firestore.doc('apps/'+appID).update(
        {
            ['evaluation.'+currentUserId]: firebase.firestore.FieldValue.delete()
        });
    }

    public changeEvalComment(appID,currentUserId,comment){
      this.firestore.doc('apps/'+appID).update(
        {
          ['evaluation.'+currentUserId+'.comment']: comment
        });
    }

    public getQuestionsByCriteria(criteria){
      return this.firestore.doc('evaluation/'+criteria);
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
  date: Date;

  public constructor(name,comment,date=new Date()){
    this.comment= comment;
    this.name= name;
    this.date=date;
  }
}


export class CriteriaDetail
{
  name: string;
  value: number;
  valid: number;
  num: number;

  public constructor(name,value,number=0){
    this.value = value;
    this.name = name;
    this.valid = value <40? 0: value<61? 1: 2;
    this.num = number;
  }
}

export class QuestionDetail
{
  text: string;
  value: number;
  valid: number;
  num: number;

  public constructor(text,value,num=0){
    this.value = value;
    this.valid = value <40? 0: value<61? 1: 2;
    this.num = num;
    this.text = text;
  }
}
