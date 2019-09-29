import { Injectable } from '@angular/core';

@Injectable()
export class ArrayKit{

    public constructor(){ }

    objectToArray(obj) {
      if (typeof(obj) === 'object') {
        var keys = Object.keys(obj);
        var allObjects = keys.every(x => typeof(obj[x]) === 'object');
        if (allObjects) {
          return keys.map(x => this.objectToArray(obj[x]));
        } else {
          var o = {};
          keys.forEach(x => {
            o[x] = this.objectToArray(obj[x])
          });
          return o;
        }
      } else {
        return obj;
      }
    }


}
