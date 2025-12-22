import { randomBytes } from 'crypto';

export function generateRandomUser() {
    const randomString = randomBytes(4).toString('hex'); //Gets 4 random bytes to HEX
  
    return {
      email: `test_email_${randomString}@email.com`,
      password: `Pass_${randomString}_safe!`,
    };
  }
  