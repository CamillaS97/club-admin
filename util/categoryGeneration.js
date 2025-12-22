import { randomBytes } from 'crypto';

const categories = ['Gym', 'Soccer', 'Football', 'Tennis', 'Swimming'];

export function generateRandomCategories() {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const randomString = randomBytes(4).toString('hex'); //Gets 4 random bytes to HEX
  
    return {
      category: `${category}${randomString}`,
      subCategory: `Sub_${category}${randomString}`,
    };
  }
  
  