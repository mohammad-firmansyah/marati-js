import { ApiProperty } from "@nestjs/swagger";
import { JsonObject } from "@prisma/client/runtime/library";
import { IsJSON, IsString } from "class-validator";

export class CreateModelDto {
    @ApiProperty()
    @IsString()
    name : string

    @ApiProperty()
    @IsString()
    filename : string

    @ApiProperty()
    @IsJSON()
    input : JsonObject

    @ApiProperty()
    @IsJSON()
    output : JsonObject

    @ApiProperty()
    @IsString()
    owner_id : string
}
