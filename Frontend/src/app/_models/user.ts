export class User {
    _id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;

    /**
     * Create new User.
     * @param email User email
     * @param password User password
     * @param firstName User first name
     * @param lastName User last name
     */
    constructor(email: string, password: string, firstName: string, lastName: string) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
