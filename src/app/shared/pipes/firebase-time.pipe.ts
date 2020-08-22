import { Pipe, PipeTransform } from '@angular/core';

import { firestore } from 'firebase/app';

@Pipe({
  name: 'firebaseTime'
})
export class FirebaseTimePipe implements PipeTransform {

  transform(value: firestore.Timestamp): Date {
    return new firestore.Timestamp(value.seconds, value.nanoseconds).toDate();
  }

}
