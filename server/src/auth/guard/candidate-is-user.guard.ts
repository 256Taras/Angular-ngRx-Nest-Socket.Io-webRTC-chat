import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../../user/service/user.service';
import User from '../../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CandidateIsUserGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const dirtyUserJwt: string = request.headers.authorization;
    const userJwt: string = dirtyUserJwt.replace('Bearer ', '');
    const { id }: any | User = await this.jwtService.decode(userJwt);
    let hasPermission = false;
    console.log('1',request.user.data.id);
    console.log('2',Number(id));
    if (Number(request.user.data.id) === Number(id)) {
      hasPermission = true;
      return hasPermission;
    }
    return hasPermission;
  }
}
