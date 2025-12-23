import { test, expect } from '@playwright/test';
import { generateRandomUser } from '../util/userGeneration';
import { generateRandomCategories } from '../util/categoryGeneration';

const {email, password} =  generateRandomUser();
const {category, subCategory} = generateRandomCategories();

test('Create user via API and save response into a costant', async ({ request }) => {

  
  const userData = {
    "email": email,
    "password": password,
    "role":[
      "ROLE_ADMIN"
    ]
  }
  const createUserResponse = await request.post('https://api.club-administration.qa.qubika.com/api/auth/register',{data: userData})
  expect(createUserResponse.status()).toBe(201)
  const result = await createUserResponse.json()
});

test('Verify if login page loaded correctly and login method', async({page}) => {
  //Access login page and wait for submit button to be loaded
  await page.goto('https://club-administration.qa.qubika.com/#/auth/login') 
  await expect(page.locator('button[type="submit"]')).toBeVisible()

  // Fill user and password
  await page.getByPlaceholder('Usuario o correo electrónico').fill(email)
  await page.getByPlaceholder('Contraseña').fill(password)

  //submit login
  await expect(page.locator('button[type="submit"]')).toBeEnabled();
  await page.locator('button[type="submit"]').click()

  //Verifies if dashboard was loaded, therefore, the user logged in
  await expect(page).toHaveURL(/dashboard/)
})

test('Category creation and verification of its existence', async({page}) => {
  
  //Login all over again
  await page.goto('https://club-administration.qa.qubika.com/#/auth/login')
  await page.getByPlaceholder('Usuario o correo electrónico').fill(email)
  await page.getByPlaceholder('Contraseña').fill(password)
  await expect(page.locator('button[type="submit"]')).toBeEnabled()
  await page.locator('button[type="submit"]').click()


  //Type the category, wait for button to be enabled and click on it to add
  await page.locator('a:has-text("Tipos de Categorias")').click()
  await page.locator('button:has-text("Adicionar")').click()
  await page.getByPlaceholder('Nombre de categoría').fill(category)
  await expect(page.locator('button[type="submit"]')).toBeEnabled()
  await page.locator('button[type="submit"]').click()

  //Verify if category addition alert was displayed
  await expect(page.getByRole('alertdialog', {name: ' Tipo de categoría adicionada satisfactoriamente '})).toBeVisible()
  
  //Goes to last page and verifies if category is there
  const items = page.locator('//app-table-generic//div[3]/nav/ul/li')
  const count = await items.count()
  await items.nth(count - 2).click()
  await expect(page.locator("tbody")).toContainText(category)
})

test('Sub category creation and verification of its existence', async({page}) => {
  
  //Login again
  await page.goto('https://club-administration.qa.qubika.com/#/auth/login')
  await page.getByPlaceholder('Usuario o correo electrónico').fill(email)
  await page.getByPlaceholder('Contraseña').fill(password)
  await expect(page.locator('button[type="submit"]')).toBeEnabled()
  await page.locator('button[type="submit"]').click()


  //Adding sub category, same field as the category
  await page.locator('a:has-text("Tipos de Categorias")').click()
  await page.locator('button:has-text("Adicionar")').click()
  await page.getByPlaceholder('Nombre de categoría').fill(subCategory)
  
  //Click on checkbox to inform that this is a subcategory
  await page.locator('#customCheckMain').click({ force: true })
  await expect(page.locator('#customCheckMain')).toBeChecked()

  //After checking the checbox, focus moves to the category dropdown to search the chosen option
  await page.keyboard.type(category);

  //Wait for dropdown to open and click on the correct option
  await expect(page.locator('div[role="combobox"]')).toHaveAttribute('aria-expanded', 'true')
  await page.getByRole('option', { name: category }).click()

  //Only after the dropdown closes we are allowed to click on the submit option
  await expect(page.locator('div[role="combobox"]')).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('button[type="submit"]')).toBeEnabled()
  await page.locator('button[type="submit"]').click()

  //Verify if category addition alert was displayed
  await expect(page.getByRole('alertdialog', {name: ' Tipo de categoría adicionada satisfactoriamente '})).toBeVisible()

  
  //Goes to last page and verifies if sub category is there
  const items = page.locator('//app-table-generic//div[3]/nav/ul/li')
  const count = await items.count()
  await items.nth(count - 2).click()
  await expect(page.locator(`tbody`)).toContainText(subCategory)
})

