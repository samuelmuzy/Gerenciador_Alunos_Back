import { Role } from "src/auth/enums/RoleEnum";

export type Payload = {
    nome: string;
    email: string;
    role: Role;
};

export type PayloadLinkClass = {
    classId:string,
    type:string,
    professorId:string
};