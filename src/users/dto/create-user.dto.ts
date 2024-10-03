import { IsString, IsArray, ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'johndoe', description: "Nom d'utilisateur" })
    @IsString()
    @IsNotEmpty()
    username: string;
  
    @ApiProperty({ example: 'password123', description: 'Mot de passe' })
    @IsString()
    @IsNotEmpty()
    password: string;
  
    @ApiProperty({ example: ['user', 'admin'], description: "Rôles de l'utilisateur" })
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    roles: string[];
  }