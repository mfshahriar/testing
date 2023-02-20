import { Injectable } from "@nestjs/common";
import { User, Bookmark } from "@prisma/client";


@Injectable()
export class AuthService {

    signup() {
        return {msg: 'I am signup'}
    }

    signin() {
        return {msg: 'I am signin'}
    }
}