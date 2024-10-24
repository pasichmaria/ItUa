import {
  BehaviorSubject,
  type Observable,
  catchError,
  from,
  map,
  of,
} from "rxjs";

import { getDepartment, getDepartments } from "../api";
import type { Department } from "../interfaces";

export class DepartmentsService {
  private departmentsSubject = new BehaviorSubject<Department[]>([]);
  public departments$: Observable<Department[]> =
    this.departmentsSubject.asObservable();

  private departmentSubject = new BehaviorSubject<Department | null>(null);
  public department$: Observable<Department | null> =
    this.departmentSubject.asObservable();

  public getDepartment(id: number): void {
    this.departmentSubject.next(null);
    this.handleGetDepartment$(id).subscribe();
  }

  public clearDepartment(): void {
    this.departmentSubject.next(null);
  }

  public getDepartments(): void {
    this.departmentsSubject.next([]);
    this.handleGetDepartments$().subscribe();
  }

  private handleGetDepartments$(): Observable<Department[]> {
    return from(getDepartments()).pipe(
      map((res) => {
        this.departmentsSubject.next(res);
        return res;
      }),
      catchError(() => {
        this.departmentsSubject.next([]);
        return of([]);
      }),
    );
  }

  private handleGetDepartment$(id: number): Observable<Department | null> {
    return from(getDepartment(id)).pipe(
      map((res) => {
        this.departmentSubject.next(res);
        return res;
      }),
      catchError(() => {
        this.departmentSubject.next(null);
        return of(null);
      }),
    );
  }
}
