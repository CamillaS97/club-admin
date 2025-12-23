# Club Admin by Qubika

This project is a e2e test for to automate a defined workflow for the Qubika Sports Club management website. In its default setting tests will be executed on Google Chrome and Firefox, but playwright.config.js has all the options to try other browsers!

---

## Requirements

Make sure the following tools are installed before running the project:

- Node.js 18+
- npm
- Javscript
- Git

---

## Installation

Clone the repository:

```bash
git clone https://github.com/CamillaS97/club-admin.git
```

Access the project folder:

```bash
cd club-admin
```

Install dependencies:

### Node
```bash
npm install
```

## Running Tests

### End-to-End Tests (Playwright)

Interactive mode:

```bash
npx playwright test --ui
```

Headless mode:

```bash
npx playwright test
```

---

##  Test Strategy and Implementation

- **Data generation functions**
  In order to not use any repeated information I've created two funcitions. The first one being the generateRandomUser that concatenates a random string to the defined email and password informations. The second, generateRandomCategories, has the same basic behavior but the defined category is randomly chosen amongst the options that are set in an array.

- **User creation using API**  
  Using the email and password given by the generateRandomUser function, it is possible to send a POST request to the Qubika API and register a new account. The test expects the 201 response and allocates the response body in a constant.

- **Login validation in the UI**  
  Once the account is already created the Login test opens the login page and, with the previously created credentials, fills the username and password fields. This test confirms the user is logged in by veryfing the dashboard URL, that is only accessible after the login.

- **Category and SubCategory tests**  
  Using the category and sub category defined by generateRandomCategories, the test navigates through the side menu and fills the category field before confirming its creation. The funcionality is basically the same for both with the major difference being in the subcategory creation, where a dropdown is loaded and must be filled before the subcategory is allowed to be created.
  By the end of both tests two verifications are made, the first on the alert confirming creation and the second on the last page of the table where the category or subcategory is verified

---

## Improvements for future me (or you, feel free to use this as a study guide):
- **Reorganize the code using PageObject**
- **Improve code so login is made only once**
- **Improve both category and subcategory tests so they are reused and not repeated**
- **Use the API response to Log in**
- **Set locators (may be part of the first one)**

## Author: Camilla Silvestre