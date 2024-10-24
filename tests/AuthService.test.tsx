import "reflect-metadata";
import { BehaviorSubject, type Observable, of } from "rxjs";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthService } from "../src/core/services";

import { container } from "tsyringe";
import type { AuthState, IAuthService } from "../src/core/interfaces";

class MockAuthService implements IAuthService {
  private authSubject = new BehaviorSubject<AuthState>({});
  state$: Observable<AuthState> = this.authSubject.asObservable();

  public login(credentials: { login: string; password: string }) {
    if (credentials.login === "test" && credentials.password === "test") {
      return this.authSubject.next({
        token: "mock_token",
        refreshToken: "mock_refresh_token",
      });
    }
    return this.authSubject.next({ error: "Invalid credentials" });
  }

  public logout() {
    return of({});
  }
}

describe("AuthService", () => {
  let authService: IAuthService;

  beforeEach(() => {
    container.register("AuthService", { useClass: MockAuthService });
    authService = container.resolve("AuthService");
  });

  it("should log in and update state", () => {
    const credentials = { login: "test", password: "test" };
    authService.login(credentials);

    authService.state$.subscribe((state) => {
      expect(state.token).toEqual("mock_token");
      expect(state.refreshToken).toEqual("mock_refresh_token");
      expect(state.error).toBeUndefined();
    });
  });

  it("should return error for invalid credentials", () => {
    const credentials = { login: "wrong", password: "wrong" };
    authService.login(credentials);

    authService.state$.subscribe((state) => {
      expect(state.error).toEqual("Invalid credentials");
      expect(state.token).toBeUndefined();
      expect(state.refreshToken).toBeUndefined();
    });
  });

  it("should log out and update state", () => {
    authService.logout();

    authService.state$.subscribe((state) => {
      expect(state.token).toBeUndefined();
      expect(state.refreshToken).toBeUndefined();
      expect(state.error).toBeUndefined();
    });
  });
});
