import {
  BehaviorSubject,
  type Observable,
  catchError,
  from,
  map,
  of,
} from "rxjs";
import type { User } from "../interfaces";

import { getUsers } from "../api";

export class UsersService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersSubject.asObservable();

  public getUsers(): void {
    this.usersSubject.next([]);
    this.handleGetUsers$().subscribe();
  }

  private handleGetUsers$(): Observable<User[]> {
    return from(getUsers()).pipe(
      map((res) => {
        this.usersSubject.next(res);
        return res;
      }),
      catchError(() => {
        this.usersSubject.next([]);
        return of([]);
      }),
    );
  }
}
