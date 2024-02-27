import { ApiProperty } from "@nestjs/swagger";
import { JsonObject } from "@prisma/client/runtime/library";
import { IsJSON, IsNumber, IsString } from "class-validator";

export class CreateComponentDto {
    @ApiProperty()
    @IsString()
    type : ComponentType
    
    @ApiProperty()
    @IsNumber()
    x : Number
    
    @ApiProperty()
    @IsNumber()
    y : Number
    
   
    
    @ApiProperty()
    @IsString()
    content : string
    
    @ApiProperty()
    @IsString()
    topic : string
    
    @ApiProperty()
    @IsJSON()
    rules : Object

    @ApiProperty()
    @IsString()
    dashboard_id : string

    @ApiProperty()
    @IsString()
    model_id : string
}


enum ComponentType {
  TEXT,
  SWITCH,
  GAUGE,
  LINEGRAPH
}