# Project Scaffolding, Step by Step

## Contents

- [MySQL Scaffolding](#mysql-scaffolding)
- [Express Scaffolding](#express-scaffolding)
- [React Scaffolding](#react-scaffolding)
- [Git and GitHub](#git-and-github)

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

1. On your computer, create a new (empty) folder that will hold your project. In your terminal, use `cd` to navigate into your new project folder.

2. From there, run the following to scaffold your Express server:

   ```bash
   npx express-generator --no-view server
   ```

   (If it prompts to install `express-generator`, confirm by typing "y".)

3. Follow the prompts in the terminal to `cd server` and install dependencies with `npm install`.

4. Install necessary packages: `mysql2`, `nodemon`, `dotenv`, and `cors`:

   ```bash
   npm install mysql2 nodemon dotenv cors
   ```

5. Add the following lines to `app.js` to enable CORS:

   ```javascript
   // Add this at the top:
   const cors = require("cors");

   // Add this after 'app' is created:
   app.use(cors());
   ```

6. Comment out the following line in `app.js` (around line 17) to prevent serving static files:

   ```javascript
   // app.use(express.static(path.join(__dirname, 'public')));
   ```

7. Also in `app.js`, update the path for your routers so they are prefixed with `/api` (around lines 18-19):

   ```javascript
   app.use("/api", indexRouter);
   app.use("/api/users", usersRouter);
   ```

8. Copy the `data` folder from this repo into your project. This folder should contain:

   - `init_db.sql`: A file containing the SQL code to build your database

9. Copy the `config` folder from this repo into your project. This folder should contain:

   - `db.js`: A wrapper around DB connections, allowing the use of `pool.query()` in your code.
   - `migrate.js`: A migration file to (re)create DB tables and insert sample data.

10. Copy the `controllers` folder from this repo into your project. This is where you will build the logic for your routes. Currently, it just contains an example file so you can get everything connected. You can change and add to this later to fit your own needs. Look at your [class activites](https://github.com/CodeOp-tech/fspt33-databases/) if you'd like more examples of controller functions.

11. As part of the automatic Express setup, you will have a `routes`folder with two starter files: `index.js`and `users.js`.Update `index.js` to import and use your example controller. Your final `index.js` file should look like this:

```javascript
const express = require("express");
const router = express.Router();
const getExample = require("../controllers/exampleController");

/* GET example */
router.get("/", getExample);

module.exports = router;
```

12. Create a `.env` file (in the root project directory) to store your database connection information. You can follow the format in the `.env.example` file. It should include the name of your project's database, as well as your host, MySQL username and password.

13. Modify the start script in `package.json` to use `nodemon`:

```json
"start": "nodemon ./bin/www"
```

14. Add a new script in `package.json` to run your migrations:

    ```json
    "migrate": "node config/migrate.js"
    ```

    Once your SQL starter code is finalized in your `init_db.sql` file, run `npm run migrate` to create your DB tables.
    If you need to modify your table later, you can update your `init_db.sql` file and run `npm run migrate` again. This will delete your old table(s) and recreate them with the new structure.

15. Update the default port in `./bin/www` from `3000` to `4000` (around line 15).

16. Add a `.gitignore` file to your server with at least the following entries:

    ```
    node_modules/
    package-lock.json
    .env
    .DS_Store
    ```

17. Test your setup:
    1. Run `npm start` inside your `server` folder to start your back-end server.
    2. Open Postman and run a GET request to http://localhost:4000/api
    3. You should see the successful response from your example controller: `{ message: "Welcome to Express" }`

**You're done! Happy back-end coding :)**

---

## React Scaffolding

1. In your terminal, `cd ..` to go back to your main project folder. Scaffold your React front-end "client" using Vite:

   ```bash
   npm create vite@latest client -- --template react
   ```

   Follow the prompts and choose React and Javascript.

2. Navigate into your client folder and install `axios`:
   ```bash
   npm install axios
   ```

### Set Up Proxy for Full-Stack Development

Configure the React front end so it communicates with the Express back end:

3. Open `vite.config.js` in your client, and configure a proxy to redirect API requests to the Express server:

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

4. Add a `.gitignore` file to your server with at least the following entries:

   ```
   node_modules/
   package-lock.json
   .DS_Store
   ```

5. Test your setup:

   1. `cd server` and `npm start` to run your server.
   2. `cd client` and `npm run dev` to run your client.
   3. In your client's App.jsx:

      1. At the top of the file, `import axios from 'axios'`.
      2. Inside the App() function, paste the following test:

      ```javascript
      const testFetch = async () => {
        // because of our proxy in vite.config, we can now fetch directly to "/api"
        const response = await axios.get("/api");
        console.log(response);
      };

      testFetch();
      ```

   4. Check your browser console - you should see the successful response object there.

**That's it! Happy front-end coding :)**

---

## Git and GitHub

Once you have created both your server and your client, it's time to create a Git repository, and push it onto GitHub:

1. In your terminal, make sure you are in your root project folder (i.e. not inside `server` or `client`).

2. Run `git init` to initialize a local Git repository.

3. Open GitHub, select the `+` sign in the top right corner, and select **New repository**.

4. Create a new repository: choose your app name and click **Create repository**.

5. Follow the instructions provided by GitHub for **"...or push an existing repository from the command line"** by copying and pasting those commands into a terminal in each project folder on your computer.

6. Invite your instructor and TA to be collaborators:

   - Go to the **Settings** tab of the repo on GitHub, then choose **Collaborators** in the left column, and press the **Add People** button. Grant admin access if necessary.

7. **Happy coding!**
