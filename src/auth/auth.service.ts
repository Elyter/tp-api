import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    async login(loginDto: LoginDto): Promise<any> {
        // Implémentez la logique d'authentification ici
        // Par exemple, vérifier les informations d'identification
        // et retourner un token JWT
        return { token: 'fake-jwt-token' };
      }
}
