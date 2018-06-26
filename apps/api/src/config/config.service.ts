import { parse, config } from 'dotenv';
import * as fs from 'fs';
// import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [prop: string]: string };

  constructor(filePath: string) {
    this.envConfig = parse(fs.readFileSync(filePath));
    config({path: filePath});
  }

  get(key: string): string {
    return process.env[key] || this.envConfig[key];
  }

  public getNumber(key: string): number {
    return parseInt(this.get(key), 10);
  }

}
