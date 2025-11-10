import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(){
    return {
      status: 'Ok',
      message: 'Api is in /api/v1/historia'
    };
  }
}
