import type { Observable } from "rxjs";

export interface User {
  id: number;
  name: string;
  lastName: string;
  fullName: string;
  fullNameEnglish: string;
  email: string;
  isActive: boolean;
  birthDay?: string;
  position?: string;
  phones?: string[];
  lastActivityAt?: string;
  createdAt: string;
  updatedAt: string;
  departments?: Department[];
}

export interface Chief {
  "@id": string;
  "@type": string;
  isActive: boolean;
  name: string;
  lastName: string;
  fullName: string;
  fullNameEnglish: string;
  email: string;
  id: number;
}

export interface Department {
  "@id": string;
  "@type": string;
  id: number;
  title: string;
  isActive: boolean;
  isMain: boolean;
  chief?: Chief;
  users: User[];
  lft: number;
  lvl: number;
  rgt: number;
  parent?: Department;
  isRemoved: boolean;
  createdBy: Chief;
  createdAt: string;
  updatedBy: Chief;
  updatedAt: string;
}

export interface AuthState {
  token?: string | null;
  refreshToken?: string | null;
  error?: string;
}

export interface IAuthService {
  login(credentials: { login: string; password: string }): void;
  logout(): void;
  state$: Observable<AuthState>;
}
