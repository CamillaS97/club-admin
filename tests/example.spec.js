import { test, expect } from '@playwright/test';
import { generateRandomUser } from '../util/userGeneration';


const {email, password} =  generateRandomUser();

test('Create user via API', async ({ request }) => {


  const userData = {
    "email": email,
    "password": password,
    "role":[
      "ROLE_ADMIN"
    ]
  }
  console.log(userData)

  const createUserResponse = await request.post('https://api.club-administration.qa.qubika.com/api/auth/register',{data: userData});

  expect(createUserResponse.status()).toBe(201);
  const result = await createUserResponse.json()
  console.log(result)
});

test('Verify if login page loaded correctly', async({page}) => {
  await page.goto('https://club-administration.qa.qubika.com/#/auth/login') //access page
  await expect(page.locator('button[type="submit"]')).toBeVisible(); //verify if login button is displayed
  
  // Fill user and password
  await page.getByPlaceholder('Usuario o correo electrónico').fill(email)
  await page.getByPlaceholder('Contraseña').fill(password)

  //submit
  await expect(page.locator('button[type="submit"]')).toBeEnabled();
  await page.locator('button[type="submit"]').click();

  //Verifies if dashboard loaded, therefore, the user logged in
  await expect(page).toHaveURL(/dashboard/);
})

test('Verify if Category creation works correctly', async({page}) => {})

test('Verify if SubCategory creation works correctly', async({page}) => {})

