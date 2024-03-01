import { ApiBearerAuth, ApiProperty } from "@nestjs/swagger";
import { JsonObject } from "@prisma/client/runtime/library";
import { IsEnum, IsJSON, IsNumber, IsString } from "class-validator";

export enum ComponentType {
  TEXT = 'TEXT',
  SWITCH = 'SWITCH',
  GAUGE = 'GAUGE',
  LINEGRAPH = 'LINEGRAPH'
}

export class CreateComponentDto {
    @ApiProperty()
    @IsEnum(ComponentType)
    type : ComponentType
    
    @ApiProperty()
    @IsNumber()
    x : number
    
    @ApiProperty()
    @IsNumber()
    y :number
    
    @ApiProperty()
    @IsString()
    content : string
    
    @ApiProperty()
    @IsString()
    topic : string
    
    @ApiProperty()
    @IsJSON()
    rules : JsonObject
    
    @ApiProperty()
    @IsString()
    dashboard_id : string
    
    @ApiProperty()
    @IsString()
    model_id : string
}


