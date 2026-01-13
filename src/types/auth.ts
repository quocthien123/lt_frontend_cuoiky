export interface RegisterFormData  {
    fullName : string;
    email : string;
    password : string;
    confirmPassword : string;
}

export interface LoginFormData {
    email : string;
    password : string;
}

export interface User {
    id: string;
    fullName: string;
    email: string;
    password: string;
}

export interface Comment {
    id: string;
    articleSlug: string;
    userName: string;
    content: string;
    createdAt: string;
}