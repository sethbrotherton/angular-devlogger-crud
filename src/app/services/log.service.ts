import { Injectable } from '@angular/core';
import { Log } from '../models/log';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs: Log[]

  private logSource = new BehaviorSubject<Log>({id:null, text:null, date:null})

  private stateSource = new BehaviorSubject<boolean>(true);

  stateClear = this.stateSource.asObservable()

  selectedLog = this.logSource.asObservable()

  constructor() {
    this.logs = [
      // {id: '1', text: 'Generated Components!', date: new Date('12/27/2017')},
      // {id: '2', text: 'Added bootstrap!', date: new Date('09/23/2017')},
      // {id: '3', text: 'Added logs component!', date: new Date('12/21/2017')}
    ]
   }

   getLogs(): Observable<Log[]> {
     if (localStorage.getItem('logs') == null) {
       this.logs = [];
     } else {
       this.logs = JSON.parse(localStorage.getItem('logs'));
     }
     return of(this.logs.sort((a, b) => {
       return b.date - a.date;
     }));
   }

   setFormLog(log: Log) {
     this.logSource.next(log);
   }

   addLog(log: Log) {
     this.logs.unshift(log)
     // add to local storage
     localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   updateLog(log: Log) {
     this.logs.forEach((curr, i) => {
        if (log.id === curr.id) {
          this.logs.splice(i, 1);
        }
     })
     this.logs.unshift(log);
     // update local storage
     localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   deleteLog(log: Log) {
    this.logs.forEach((curr, i) => {
      if (log.id === curr.id) {
        this.logs.splice(i, 1);
      }
   })
   // update local storage
   localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   clearState() {
     this.stateSource.next(true);
   }

}
