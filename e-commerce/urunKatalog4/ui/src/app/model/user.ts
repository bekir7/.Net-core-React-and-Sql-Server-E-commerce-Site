import { Sepet } from "./sepet";

export interface User{
    email:string;
    token:string;
    sepet?:Sepet;
    roles?:string[];
}