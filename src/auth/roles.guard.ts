import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('Required roles:', requiredRoles);
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('User object in RolesGuard:', JSON.stringify(user));
    if (!requiredRoles) {
      return true;
    }
    return requiredRoles.some((role) => user?.roles?.includes(role));
  }
}
