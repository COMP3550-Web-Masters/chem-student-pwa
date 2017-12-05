import { AuthenticationLevel, UpdateProfileInfo, InitProfileInfo, User } from './../../models/user/user.models';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

    user: Observable<User> = null;
    userid: string;

    constructor(private fbAuth: AngularFireAuth,
                private db: AngularFireDatabase) {
        this.fbAuth.authState.subscribe(user => {
            if(user) {
                this.userid = user.uid; 
            }
        });
    }

    /**
     * Gets an object containing the current user
     */
    getUser(){
        this.user = this.db.object<User>('users/' + this.userid).valueChanges();
        return this.user;
    }

    /**
     * Returns whether the user is logged in or not
     */
    isLoggedIn() {
        return this.fbAuth.auth.currentUser != null;
    }

    /**
     * Logs a user in using their email and password
     * @param email The user's email
     * @param password The user's password
     */
    login(email: string, password: string) {
        return this.fbAuth.auth.signInWithEmailAndPassword(email, password).then(user => {
            this.userid = user.uid;
            return this.isProfileCompleted();
        }, err => {
            throw err;
        });
    }

    /**
     * Registers a user using their email and password
     * @param email The user's email
     * @param password The user's password
     */
    signup(email: string, password: string) {
        return this.fbAuth.auth.createUserWithEmailAndPassword(email, password).then(user => {
            this.userid = user.uid;
            this.initUserProfile(email);
        }, err => {
            throw err;
        });
    }

    /**
     * Initializes a user's profile with its email and a default authentication level
     * @param email The email address of the user
     */
    initUserProfile(email) {
        if(!this.userid) throw new Error('User not logged in');
        const ref = this.db.object('users/' + this.userid);
        const profile: InitProfileInfo = {
            'userid': this.userid,
            'email': email,
            'authenticationLevel': AuthenticationLevel.none,
        };
        return ref.update(profile);
    }

    /**
     * Returns an observable whether a user's role is undefined or not
     */
    isProfileCompleted() {
        if(!this.userid) throw new Error('User not logged in');
        const ref = this.db.object('users/' + this.userid);
        return ref.valueChanges().map(user => user['authenticationLevel'] > AuthenticationLevel.none);
    }

    /**
     * Updates the user's profile information
     * @param profileInfo The profile object containing the user's information
     */
    updateUserProfile(fullName: string, departmentCode: string) {
        if(!this.userid) throw new Error('User not logged in');
        const profileInfo: UpdateProfileInfo = {
            'fullName': fullName,
            'departmentCode': departmentCode,
            'authenticationLevel': AuthenticationLevel.student,
        }
        const userRef = this.db.object('users/' + this.userid);
        return userRef.update(profileInfo);
    }
    

    /**
     * Signs out a user from the applicProfileInfo
     */
    signOut() {
        return this.fbAuth.auth.signOut();
    }
}