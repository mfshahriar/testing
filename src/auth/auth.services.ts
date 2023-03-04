import { ForbiddenException, Injectable } from "@nestjs/common";
import { User, Bookmark, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";



@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService) {}

    async signup(dto: AuthDto) {
        // generate the password hash
        const hash = await argon.hash(dto.password);

        // save the new user in db
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            });

            //console.log(user);

            delete user.hash;
            // return the user
            return user;
            //return {msg: 'I am signup'}
        }   catch (error) {
            //console.log(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                if (error.code === 'P2002' //error code for same value
                ) {
                    console.log(error.code, error.message)
                    //return {error: 'Email already exists'};
                    throw new ForbiddenException('Email already exists',);
                }
                return {error: 'Something went wrong'};
            }
            throw error;
        }
    }

    async signin(dto: AuthDto) {

        // find the user by email
        //throw exception if user is not found 
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) {
            throw new ForbiddenException('User does not exist!');
        }

        //compare password
        //throw exception if password is not correct

        const pwMatches = await argon.verify(user.hash, dto.password);

        if(!pwMatches) {
            throw new ForbiddenException('wrong password');
        }

        // delete the hash from the user object

        delete user.hash;

        // return the user if everything is ok

        return user;

        //return {msg: 'I am signin'}
    }
}