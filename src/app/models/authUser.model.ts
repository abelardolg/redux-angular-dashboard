
export class AuthUser {

    static fromFirestore({uid, name, email}): AuthUser {
        return new AuthUser(uid, name, email);
    }

    constructor(
        public uid: string,
        public name: string,
        public email: string
    ){}
}
