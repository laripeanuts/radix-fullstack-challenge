import { Injectable } from '@nestjs/common';

@Injectable()
export class IdGeneratorService {
  private generateRandomPrefix(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let prefix = '';
    for (let i = 0; i < 2; i++) {
      prefix += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return prefix;
  }

  generateEquipmentId(): string {
    const prefix = this.generateRandomPrefix();
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
    return `${prefix}-${randomNumber}`;
  }
}
