import { ApiProperty } from "@nestjs/swagger";
import { JsonObject } from "@prisma/client/runtime/library";
import { IsJSON, IsNumber, IsString } from "class-validator";

export class CreateComponentDto {
    @ApiProperty()
    @IsString()
    type : string
    
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
    rules : string
    
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