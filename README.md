# Project Scaffolding, Step by Step

## Contents

- [MySQL Scaffolding](#mysql-scaffolding)
- [Express Scaffolding](#express-scaffolding)
- [React Scaffolding](#react-scaffolding)
- [Push Your Repositories to GitHub](#push-your-repositories-to-github)

---

## MySQL Scaffolding

1. Open MySQL:

   1. If you use MySQL Workbench, open that. OR:
   2. If you have a Windows, open the MySQL Command Line Interface (CLI) tool. OR:
   3. If you have Mac, run `mysql -u root -p` to open the MySQL CLI.

2. Create a database for your app by running `CREATE DATABASE your-app-name;` (replace with your actual app name). Don't worry about tables yet, that will come later! Check that it worked:

   1. If you're using MySQL Workbench, you should see your new database name in your database list on the left.
   2. If you're using the MySQL CLI (Mac or Windows), run `SHOW DATABASES;` to see a list of your databases: the new one should be there.

## Express Scaffolding

1. In your terminal, run the following to scaffold a new Express application called "your-app-name-server" (replace with your actual app name):

   ```bash
   npx express-generator --no-view your-app-name-server
   ```

   (If it prompts to install `express-generator`, confirm by typing "yes.")

2. Follow the prompts in the terminal to `cd` into your new folder and install dependencies:

   ```bash
   npm install
   ```

3. Install necessary packages: `mysql2`, `nodemon`, `dotenv`, and `cors`:

   ```bash
   npm install mysql2 nodemon dotenv cors
   ```

4. Add the following lines to `app.js` to enable CORS and parse JSON requests:

   ```javascript
   // Add this at the top:
   const cors = require("cors");

   // Add this after 'app' is created:
   app.use(cors());
   ```

5. Comment out the following line in `app.js` (around line 17) to prevent serving static files:

   ```javascript
   // app.use(express.static(path.join(__dirname, 'public')));
   ```

6. Copy the `data` folder from this repo into your project. This folder should contain:

   - `init_db.sql`: A file containing the SQL code to build your database

7. Copy the `config` folder from this repo into your project. This folder should contain:

   - `db.js`: A wrapper around DB connections, allowing the use of `pool.query()` in your code.
   - `migrate.js`: A migration file to (re)create DB tables and insert sample data.

8. Copy the `controllers` folder from this repo into your project. This is where you will build the logic for your routes. Currently, it just contains an example file so you can get everything connected. You can change and add to this later to fit your own needs. Look at your [class activites](https://github.com/CodeOp-tech/fspt33-databases/) if you'd like more examples.

9. As part of the automatic Express setup, you will have a `routes`folder with two starter files: `index.js`and `users.js`.

Update `index.js` to import and use your example controller. Your final `index.js` file should look like this:

```javascript
const express = require("express");
const router = express.Router();
const getExample = require("../controllers/exampleController");

/* GET example */
router.get("/", getExample);

module.exports = router;
```

10. Create a `.env` file (in the root project directory) to store your database connection information. You can follow the format in the `.env.example` file. It should include the name of your project's database, as well as your host, MySQL username and password.

11. Modify the start script in `package.json` to use `nodemon`:

```json
"start": "nodemon ./bin/www"
```

12. Add a new script in `package.json` to run your migrations:

    ```json
    "migrate": "node config/migrate.js"
    ```

    Once your SQL starter code is finalized in your `init_db.sql` file, run `npm run migrate` to create your DB tables.
    If you need to modify your table later, you can update your `init_db.sql` file and run `npm run migrate` again. This will delete your old table(s) and recreate them with the new structure.

13. Update the default port in `./bin/www` from `3000` to `4000` (around line 15).

14. Add a `.gitignore` file to your project with at least the following entries:

    ```
    node_modules/
    .env
    .DS_Store
    ```

15. Initialize Git for your Express app:

    ```bash
    git init
    ```

16. Stage and commit your initial Express files:

    ```bash
    git add .
    git commit -m "Initial Express commit"
    ```

17. Test your setup:
    1. Run `npm start` to start your back-end server.
    2. Open Postman and run a GET request on http://localhost:4000
    3. You should see the successful response from your example controller: `{ message: "Welcome to Express" }`

**You're done! Happy back-end coding :)**

---

## React Scaffolding

1. In your terminal, scaffold a new React application called "your-app-name-client" using Vite:

   ```bash
   npm create vite@latest your-app-name-client -- --template react
   ```

   Follow the prompts and choose React.

2. Navigate into your React app folder and install `axios`:
   ```bash
   npm install axios
   ```

### Set Up Proxy for Full-Stack Development

Configure the React front end communicates with the Express back end:

3. Open `vite.config.js` in your React app and configure a proxy to redirect API requests to the Express server:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     server: {
       proxy: {
         "/api": {
           target: "http://localhost:4000",
           changeOrigin: true,
           secure: false,
         },
       },
     },
   });
   ```
   **Note:** All back-end routes should start with `/api`.

### Set Up Git for Your React App

4. Initialize Git for your React app:

   ```bash
   git init
   ```

5. Add a `.gitignore` file to your project with the following entries:

   ```
   node_modules/
   .DS_Store
   ```

6. Stage and commit your initial React files:

   ```bash
   git add .
   git commit -m "Initial React commit"
   ```

7. **Happy (front-end) coding!**

---

## Push Your Repositories to GitHub

Once you have created separate repositories for the front-end and back-end apps:

1. On your GitHub page, select the `+` sign in the top right corner, and select **New repository**.

2. For each app (Express and React), create a new repository:

   - Name one repository something like `your-app-name-server` and the other `your-app-name-client`.

3. **Do not select "Add a README file."**

4. Click **Create repository** for each repo.

5. Follow the instructions provided by GitHub for **"...or push an existing repository from the command line"** by copying and pasting those commands into a terminal in each project folder on your computer.

6. Invite collaborators (like your instructor) to each repository:

   - Go to the **Settings** tab of the repo on GitHub, then choose **Collaborators** in the left column, and press the **Add People** button. Grant admin access if necessary.

7. **Happy coding!**
