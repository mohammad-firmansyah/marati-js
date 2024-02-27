import { IsString } from "class-validator";

export class CreateDashboardDto {
  @IsString()
  name : String 

  @IsString()
  username : String

  @IsString()
  password: String

  @IsString()
  description : String

}
