export class User {
    constructor(userName, password) {
        this.userName = userName;
        this.password = password;
        this.banner = null;
        this.landingPage = null;
        this.newsLetter = null;
        this.numOfImg = 1;
        this.numOfTextEdit = 1;
    }
    getUsername() {
        return this.userName;
    }
    confirmUser(userName, password) {
        return (this.userName === userName && this.password === password);
    }
};