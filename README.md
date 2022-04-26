# University Catalog

## Environment Setup

## Technologies Used
- Next.js
- TailwindCSS
- Prisma ORM
- MySQL database

### __Prerequisites__
1) PHP installed
2) MySQL server installed
3) Node version 17 installed

 ### __Setup__
1) Clone the repo by running 
    ``` sh
    git clone git@github.com:tranhuy/University-Catalog.git
    ```
2) Locate the .env.template file and rename it to .env

3) Open the .env file and add your MySQL credentials

4) Install dependencies by running
    ``` sh
    yarn
    ```
5) Create the database schema by running
    ``` sh
    yarn prisma migrate dev --name migration
    ```
5) Seed database tables by running
    ``` sh
    yarn seed
    ```
6) Build and start the application by running
    ``` sh
    yarn build
    ```
    ``` sh
    yarn start
    ```