// Authentication levels for all users
export enum AuthenticationLevel {
    none,
    student,
    tutor,
    lecturer,
    department,
    admin
}

// Identifies the user object when signing up or initializing the user
export interface InitProfileInfo {
    userid: string;
    email: string;
    authenticationLevel: AuthenticationLevel;
}

// Identifies the user object for updating the profile
export interface UpdateProfileInfo {
    fullName: string;
    departmentCode: string;
    authenticationLevel: AuthenticationLevel;
}

// Identifies the entire user object in firebase
export interface User {
    userid: string;
    email: string;
    fullName: string;
    departmentCode: string;
    authenticationLevel: AuthenticationLevel;
}