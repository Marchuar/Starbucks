export interface User<Method> {
    userData: Method,
    userPassword: string;
}

export interface Register {
    userName: string;
    userEmail: string;
}

export interface Login {
    userEmail: string,
}
