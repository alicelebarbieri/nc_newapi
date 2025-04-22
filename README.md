Configuration
This project requires environment variables that are not included in the repository (they’re excluded via .gitignore using .env.*). After cloning the repository, follow these steps to set up your local environment:

1. Create the Environment Files
You must create two files in the root directory of the project:

.env.development – for connecting to the development database

.env.test – for connecting to the test database

Note: These files are not pushed to GitHub, so you will need to set them up manually.

2. Add the Required Variables
In each file, add the following entry:

.env.development
env
Copy
PGDATABASE=nc_news
This variable tells the project to connect to the nc_news database for development purposes.

.env.test
env
Copy
PGDATABASE=nc_news_test
This variable tells the project to connect to the nc_news_test database when running tests.

3. Verify Your Setup
After creating the files and adding the variables, run:

For testing the seed function:

bash
Copy
npm run test-seed
You should see logs confirming a connection to the test database (nc_news_test).

For seeding the development database:

bash
Copy
npm run seed-dev
This will run the seed script using the development data and confirm a connection to nc_news.

