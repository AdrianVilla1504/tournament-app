# Tournament App

![Project Image](/public/project_preview.png)

---

### Table of Contents

- [Description](#description)
- [Used technologies](#used-technologies)
- [Installation](#installation)
- [Considerations](#considerations)
- [Author Info](#author-info)

---

## Description

Web application for a tennis league. The system caters to two types of users: Administrators and Regular Users. Administrators manage tournaments and users, while Regular Users can view and sign up for tournaments.

---

## Used technologies

#### Code language

- Javascript

#### Database and ODM

- MongoDB 6.0
- Mongoose 8.0.0

#### Execution enviroment

- Node 20.9.0

#### Frameworks and libraries

- Next 14.0.2
- Material UI (with Day js 1.11.10)

#### Authentication

- Next auth 4.24.5 (with JWT)
- Bcrypt 2.4.3

#### Package manager

- npm

###### Dependencies preview

```json
"dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.14.16",
    "@mui/material": "^5.14.17",
    "@mui/x-date-pickers": "^6.18.1",
    "bcryptjs": "^2.4.3",
    "dayjs": "^1.11.10",
    "mongoose": "^8.0.0",
    "next": "14.0.2",
    "next-auth": "^4.24.5",
    "react": "^18",
    "react-dom": "^18"
  }
```

[Back To The Top](#tournament-app)

---

## Installation

##### Clone the repository

- First of all, clone the repository on your local with

```node
git clone git@github.com:AdrianVilla1504/tournament-app.git
```

- If you don't have a ssh key related with your github account you could use:

```node
git clone https://github.com/AdrianVilla1504/tournament-app.git
```

##### Create the .env.local file

- You must create the .env.local file on the root folder, with the following variables:

```node
DB_HOST = "Your mongo db URI"; // Example => "mongodb://localhost/tournamentApp"
NEXT_PUBLIC_API_URL = "Your_domain/api"; // => Example "http://localhost:3000"
NEXTAUTH_SECRET = "A_random_string_for_JWT"; // => Example "RANDOM987"
```

##### Install dependencies

- Execute `npm install` or `npm i` in your terminal on the root folder to install all packages configured on the `package.json`.

##### Run the project

- Run on the root of your project `npm run dev`, and on your terminal you should see this:

![Success runing project terminal preview](/public/success_terminal_preview.png)

[Back To The Top](#tournament-app)

---

## Considerations

- I used the entire Next.js function ecosystem, both on the frontend and backend, to extract and leverage its potential with server-side rendering for fetching data.

- Additionally, I implemented NEXT AUTH for authentication due to its compatibility with the Next.js ecosystem and the possibility of OAuth integration.

- In terms of principles, particularly abstraction, I applied SOLID principles. The interface segregation principle was used to pass through props only what was necessary, and the single responsibility principle guided the reuse of functionalities like data fetching or posting. I also created components such as `<HeroHomePage/>`, fulfilling its respective functionality as implied by its name. In addition functions depend on the `API URL`, which is obtained from environment variables `(process.env.NEXT_PUBLIC_API_URL)`. This allows for dependency inversion, as the code does not depend directly on a specific URL but retrieves the URL from an external provider.

- As a design pattern, I employed MVC (Model-View-Controller) for developing the application in a modular and maintainable manner. The separation of concerns between frontend and backend into distinct components facilitates easier management and enables changes on either side without interference. Consequently, the application is scalable, maintainable, and more straightforward to expand.

- I opted for Material UI for styling due to its ease of interface development, component readability, and the presence of a robust ecosystem with support.

- Finally, I used Mongoose as an ODM since it was specifically designed for MongoDB, ensuring greater compatibility.

[Back To The Top](#tournament-app)

---

## Author Info

- LinkedIn - [Adrian Camilo Villa Jimenez](https://www.linkedin.com/in/adrian-villa-776783175/)
- Website - [Adrian Villa Dev](https://adrian-villa-dev-portfolio.vercel.app/)

[Back To The Top](#tournament-app)
