import {
  BehaviorSubject,
  type Observable,
  catchError,
  filter,
  from,
  map,
  merge,
  of,
  scan,
  switchMap,
  timer,
} from "rxjs";
import "reflect-metadata";

import { login, refreshToken, removeToken, setToken } from "../api";
import type { AuthState, IAuthService } from "../interfaces";

export interface LoginCredentials {
  login: string;
  password: string;
}

export class AuthService implements IAuthService {
  private authSubject = new BehaviorSubject<AuthState>({
    token: sessionStorage.getItem("token"),
    refreshToken: sessionStorage.getItem("refreshToken"),
  });
  public state$: Observable<AuthState>;

  constructor() {
    this.state$ = this.initState$();
    this.startTokenRefresh();
  }

  public login(credentials: LoginCredentials) {
    this.handleLogin(credentials);
  }

  public logout() {
    removeToken();
    this.authSubject.next({});
  }

  private initState$(): Observable<AuthState> {
    return merge(this.authSubject).pipe(
      scan((state, newState) => {
        if (Object.keys(newState).length === 0) {
          return {};
        }
        return { ...state, ...newState };
      }, {}),
    );
  }

  private handleLogin(credentials: LoginCredentials): void {
    from(login(credentials))
      .pipe(
        map((res) => {
          setToken(res.token, res.refresh_token);
          return { token: res.token, refreshToken: res.refresh_token };
        }),
        catchError((error) => of({ error: error.message })),
      )
      .subscribe((newState) => {
        this.authSubject.next(newState);
      });
  }

  private startTokenRefresh() {
    timer(0, 29 * 60 * 1000)
      .pipe(
        switchMap(() => {
          const currentState = this.authSubject.getValue();
          if (!currentState.token) {
            return of(null);
          }

          return from(refreshToken()).pipe(
            map((res) => {
              setToken(res.token, res.refresh_token);
              return { token: res.token, refreshToken: res.refresh_token };
            }),
            catchError((error) => {
              this.logout();
              return of({ error: error.message });
            }),
          );
        }),
        map((newState) => (newState ? newState : null)),
        filter((newState) => newState !== null),
      )
      .subscribe((newState) => this.authSubject.next(newState));
  }
}
