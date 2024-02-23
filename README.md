## Commands

* Create a new instance to test changes.
  ```bash
  npm run dev
  ```

* Build application to check for any errors that may crop up when hosting app.
  ```bash
  npm run build 
  ```

* Create database tables and seed them with sample data.
  ```bash
  npm run seed 
  ```

* Test database queries.
  ```bash
  npm run test 
  ```

* Test for any linting errors.
  ```bash
  npm run lint 
  ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Navigation

### Top Level
* `app/` : Application code lives here.
* `public/` : Images and other resources live here.
* `scripts/` : Testing and seeding scripts live here.
* `.env` : Database secrets stored here.
* `ca.pem` : Database connection certificate.

### App Directory
* `app/lib/` : Utility and library functions live here.
* `app/{page-name}/` : Each page gets a dedicated folder that NextJS uses for creating routes. See below for more details.
* `app/ui/` : UI components live here.
* `app/layout.tsx` : Application's general layout structure for each page is defined here.
* `app/page.tsx` : Application's entry point is defined here. Leads to Home page by default.

### Lib Directory
* `app/lib/actions.ts` : Helper functions for form actions defined here.
* `app/lib/data.ts` : Helper functions for the frontend to use when querying database defined here.
* `app/lib/db.ts` : Database connection is established and exported here.
* `app/lib/entity.ts` : Entity template defined here. Provides helper methods for common queries. To be (optionally) implemented by each entity.
* `app/lib/mysql.ts` : Helper class for calling MySQL queries. Mostly for handling connections.
* `app/lib/query.ts` : Helper class for dynamically generating SQL queries. Provides a limited subset of functions that you'd normally find in an ORM package.
* `app/lib/placeholder-data.ts` : Sample data for each entity stored here. Used for seeding database.
* `app/lib/{name}-entity.ts` : (Optional) helper class for calling database queries for a specific entity.

### UI Directory
* `app/ui/extensions/` : Wrapper components for common UI elements defined here. They're optional, and work exactly like normal HTML attributes. Makes it easier to swap out UI libraries since they have to change in one place only.
* `app/ui/{entity}` : Entity-specific UI components stored here. The important ones are: 
  * `create-form.tsx`
  * `edit-form.tsx`
  * `table.tsx`
* `app/ui/app-logo.tsx` : Application logo component defined here.
* `app/ui/{name}-icon.tsx` : SVG icons defined here. Can be used for creating custom icons.
* `app/ui/fonts.ts` : Application fonts defined here.
* `app/ui/globals.css` : Application CSS styles defined here. Only applies for using TailwindCSS.
* `app/ui/nav-link.tsx` : Definition for a single navigation link component.
* `app/ui/nav-links.tsx` : Definition for a collection of navigation link components.
* `app/ui/sidenav.tsx` : Application navigation bar defined here.

### Routing Directories (`EntityName/`)
* `app/entityName/[id]/edit/` : Application route to the edit form of a given entity by it's ID.
* `app/entityName/[id]/edit/page.tsx` : Edit form page for entity defined here.
* `app/entityName/create/` : Application route to create form of a given entity.
* `app/entityName/create/page.tsx` : Create form page for entity defined here.
* `app/entityName/page.tsx` : Entity page component defined here.

## How To Create Necessary Pages and Components for an Entity
1. Add a directory for the page under `app/`.
2. Add a directory for the page under `ui/`.
3. Add a `table.tsx` file under `ui/pageName/`.
4. Define your table layout here. Look at `app/ui/monsters/table.tsx` for an example of how this could be done. 
  * Note in here there is a database query being made. Since this is not required yet, you can skip the `fetchMonsters()` function call and manually populate the table instead. 
  * Note how the table has an `UpdateMonster` and `DeleteMonster` component defined. These handle 
  Edit and Delete operations on a given row in the entity. You can either manually insert your own links here, or create dedicated components like in the example. Look at the components for how to do so yourself.
5. Add a `page.tsx` file under `app/pageName/`.
6. Define your page layout here. Look at `app/monsters/page.tsx` for an example on how this could be done.
  * Note there is a link to the table component here. Replace with your own table component instead.
  * Also note there's an icon with a link that leads to the `/monsters/create`. Replace with a link to your own entity's create page instead.
7. Test it out. You should be able to reach your page and see a populated table at `localhost:3000/pageName`.
8. Add a `edit-form.tsx` file under `app/ui/pageName/`.
9. Look at `app/ui/monsters/edit-form.tsx` for an example on how this should look like.
  * Note that there are state functions that perform database queries. You can ignore these.
  * Note that this example performs form validation on the server, which assumes the database connection for the entity is configured already. This could probably be faked, but for now you can perform form validation client-side instead.
  * Note also that each field has a div for displaying the error. You can safely delete these for now.  
  * You would want to link the buttons to route back to the entity's main page. Since the submit button calls a form action that can't be used here, copy the code for the Cancel button instead.
10. Repeat steps (8-9) for the `create-form`.
11. Add a directory and subdirectory named `[id]/edit` under `app/pageName/`.
12. Add a `page.tsx` file here. 
13. Define the edit-page layout for your entity. Look at `app/monsters/[id]/edit/page.tsx` for an example.
  * If your entity won't be connected to the backend at the moment, you can remove the `fetch*` calls. Replace with hard-coded values instead.
  * Note how the page includes the edit form component. Add your's here.
14. Add a `app/ui/pageName/create/` directory.
15. Add a `page.tsx` file under `app/ui/pageName/create/`.
16. Repeat step 13 for the `create` page.
17. Test your app again. You should have additional routes for `app/ui/pageName/[id]/edit` and `app/ui/pageName/create`. The buttons on your pages should route to the correct page.
18. Run the build command from earlier to test for any errors. 
19. If all is good, push to GitHub and look for a green checkmark beside your commit. If it's red, something went wrong and the site will revert to the most recent working version instead.

## References

* Learn Next.js

  // Citation for the following function:
  // Date: 02/18/2024
  // Adapted from: Learn Next.js
  // 


  https://nextjs.org/learn/dashboard-app

  https://github.com/vercel/next-learn

* SVGR

  https://react-svgr.com/playground/?typescript=true

* MySQL

  https://sidorares.github.io/node-mysql2/docs/documentation

* ReGeX Form Validation

  https://stackoverflow.com/a/12778207

  https://stackoverflow.com/a/75516346

* MySQL Utilitys

  https://dev.to/larswaechter/using-mysql-in-nodejs-with-typescript-ida