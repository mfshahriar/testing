import { Module } from "@nestjs/common/decorators";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.services";

@Module({
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}