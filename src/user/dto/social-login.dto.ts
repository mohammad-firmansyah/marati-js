import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SocialLoginDto{
    @ApiProperty()
    @IsString()
    token:string;
}