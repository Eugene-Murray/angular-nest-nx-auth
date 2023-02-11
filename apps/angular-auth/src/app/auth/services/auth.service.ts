/**
 * Based on
 * https://github.com/cornflourblue/angular-7-jwt-authentication-example
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface ApplicationUser {
	access_token: string;
	expiresIn: Date;
	username: string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private currentUserSubject: BehaviorSubject<ApplicationUser | null>;
	public currentUser: Observable<ApplicationUser | null>;

	constructor(private readonly http: HttpClient) {
		const currentUser = localStorage.getItem('currentUser');
		if (currentUser) {
			this.currentUserSubject = new BehaviorSubject<ApplicationUser | null>(JSON.parse(currentUser));
		} else {
			this.currentUserSubject = new BehaviorSubject<ApplicationUser | null>(null);
		}
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): ApplicationUser | null {
		return this.currentUserSubject.value;
	}

	login(username: string, password: string) {
		const headers = new HttpHeaders()
			.set('content-type', 'application/json')
			.set('Access-Control-Allow-Origin', '*');
		return this.http.post<any>('http://localhost:3333/api/auth/login', { username, password }, { headers }).pipe(
			map(user => {

				console.warn('user', user);

				// login successful if there's a jwt token in the response
				if (user && user.access_token) {
					// store; user; details; and; jwt; token in local
					// storage; to; keep; user; logged in between; page; refreshes;

					localStorage.setItem('currentUser', JSON.stringify(user));
					this.currentUserSubject.next(user);
				}

				return user;
			})
		);
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
	}

	getProfile() {	
		return this.http.get<any>('http://localhost:3333/api/profile');
	}
}
