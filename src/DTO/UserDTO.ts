export class UserDTO {
    id: string;
    name: string;
    email: string;
    password: string;
    birth: string;
    gender: string | undefined;
    phone: string;
    admin: boolean | undefined;
}