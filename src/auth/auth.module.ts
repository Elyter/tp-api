import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module'; // Ajoutez cette ligne
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    UsersModule, // Ajoutez cette ligne
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || '8f7d3b2a1e6c9f4a5d8e7b0c3a2f1e9d',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService, RolesGuard],
})
export class AuthModule {}
