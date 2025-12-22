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

##  Test Strategy


- **User creation using API**  
  Using randomly generated email and password (to avoid reuse) the test posts into the API to register a new user.

- **Login validation in the UI**  
  With same credentials from the first test, the code verifies if the Login page was correctly loaded. After it the login and password fields are filled and the login is made. To verify if the login was successfull, the new url is verified

- **Category and SubCategory tests**  
  Using a function to create random categories and subcategories, the test navigates through the side menu and fills the Category field before confirming its creation. The funcionality is basically the same for both, the difference being in the subcategory creation where a dropdown is loaded and must be filled before the subcategory is allowed to be created.
  By the end of both tests two verifications are made, the first on the alert confirming creation and the second on the last page of the table where the category or subcategory is verified

---

## Improvements for future me (or you, feel free to use this as a study guide):
- **Reorganize the code using PageObject**
- **Login should be made only once**
- **Use the API response to Log in**
- **Set locators (may be part of the first one)**

## Author: Camilla Silvestre