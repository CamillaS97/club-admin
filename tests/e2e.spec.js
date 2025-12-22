import { test, expect } from '@playwright/test';
import { generateRandomUser } from '../util/userGeneration';
import { generateRandomCategories } from '../util/categoryGeneration';

const {email, password} =  generateRandomUser();
const {category, subCategory} = generateRandomCategories();

test('Create user via API', async ({ request }) => {


  const userData = {
    "email": email,
    "password": password,
    "role":[
      "ROLE_ADMIN"
    ]
  }
  const createUserResponse = await request.post('https://api.club-administration.qa.qubika.com/api/auth/register',{data: userData});
  expect(createUserResponse.status()).toBe(201);
  const result = await createUserResponse.json()
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

test('Verify if Category creation works correctly and if category exists', async({page}) => {
  
  await page.goto('https://club-administration.qa.qubika.com/#/auth/login')

  // Fill user and password
  await page.getByPlaceholder('Usuario o correo electrónico').fill(email)
  await page.getByPlaceholder('Contraseña').fill(password)

  //submit
  await expect(page.locator('button[type="submit"]')).toBeEnabled();
  await page.locator('button[type="submit"]').click();


  //Adding category
  await page.locator('a:has-text("Tipos de Categorias")').click();

  await page.locator('button:has-text("Adicionar")').click();
  await page.getByPlaceholder('Nombre de categoría').fill(category)

  //submit category
  await expect(page.locator('button[type="submit"]')).toBeEnabled();
  await page.locator('button[type="submit"]').click();

  //Verify if category addition alert was displayed
  await expect(page.getByRole('alertdialog', {name: ' Tipo de categoría adicionada satisfactoriamente '})).toBeVisible(); 
  
  //Goes to last page and verifies if category is there
  const items = page.locator('//app-table-generic//div[3]/nav/ul/li');
  const count = await items.count();

  await items.nth(count - 2).click();
  await expect(page.locator("tbody")).toContainText(category)
})

test('Verify if SubCategory creation works correctly', async({page}) => {
  await page.goto('https://club-administration.qa.qubika.com/#/auth/login')

  // Fill user and password
  await page.getByPlaceholder('Usuario o correo electrónico').fill(email)
  await page.getByPlaceholder('Contraseña').fill(password)

  //submit
  await expect(page.locator('button[type="submit"]')).toBeEnabled();
  await page.locator('button[type="submit"]').click();


  //Adding category
  await page.locator('a:has-text("Tipos de Categorias")').click();

  await page.locator('button:has-text("Adicionar")').click();
  await page.getByPlaceholder('Nombre de categoría').fill(subCategory)
  
  await page.locator('#customCheckMain').click({ force: true });
  await expect(page.locator('#customCheckMain')).toBeChecked();

  await page.keyboard.type(category);
  // wait for dropdown to open
  await expect(
    page.locator('div[role="combobox"]')
  ).toHaveAttribute('aria-expanded', 'true');

  // click the desired option by text
  await page.getByRole('option', { name: category }).click();

  // wait for dropdown to close (selection applied)
  await expect(
    page.locator('div[role="combobox"]')
  ).toHaveAttribute('aria-expanded', 'false');
  
  await expect(page.locator('button[type="submit"]')).toBeEnabled();
  
  await page.locator('button[type="submit"]').click();

  //Verify if category addition alert was displayed
  await expect(page.getByRole('alertdialog', {name: ' Tipo de categoría adicionada satisfactoriamente '})).toBeVisible(); 

  
  //Goes to last page and verifies if category is there
  const items = page.locator('//app-table-generic//div[3]/nav/ul/li');
  const count = await items.count();

  await items.nth(count - 2).click();
  
  await expect(page.locator(`tbody`)).toContainText(subCategory)
})

