
export class AuthUser {

    static fromFirestore ({uid, name, email}) {
        return new AuthUser(uid, name, email);
    }

    constructor(
        public uid: string,
        public name: string,
        public email: string
    ){}
}