import { Injectable } from "@angular/core";

import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudProvider {

  private snapshotChangesSubscription: any;
  constructor(public afs: AngularFirestore){}

  getTasks(){
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this.afs.collection('tasks').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }

  updateTask(taskKey, value){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('tasks').doc(taskKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  deleteTask(taskKey){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('tasks').doc(taskKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  createTask(value){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('tasks').add({
        title: value.title,
        content: value.content
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }



}
