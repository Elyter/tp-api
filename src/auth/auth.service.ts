import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId, roles: user.roles };
        return {
            token: this.jwtService.sign(payload),
        };
    }
}
