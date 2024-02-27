import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDashboardDto {
  @ApiProperty()
  @IsString()
  name : string
  
  @ApiProperty()
  @IsString()
  username : string
  
  @ApiProperty()
  @IsString()
  password: string
  
  @ApiProperty()
  @IsString()
  description : string
  
  @ApiProperty()
  @IsString()
  server : string
  
  @ApiProperty()
  @IsString()
  owner_id : string
}
