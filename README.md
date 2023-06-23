# Social Media App
this is a weird combination of twitter and reddit, made just for fun and to try out new stuff such as graphs in postgresql for recommendation algorithms, custom compiler with type generation for sql, and nested routing & form actions in react router.

# Features
- Custom Prisma-esque ORM: The app utilizes a custom ORM inspired by Prisma for efficient database interactions. It provides type and SQL code generation for easy integration with the database.

- Custom Compiler in Rust: The app includes a custom compiler written in Rust that enhances the performance and reliability of the ORM and database operations, for code see: orm/db/ast.

- React in SSR mode using Vite: The frontend is built with React and is configured to run in server-side rendering (SSR) mode using Vite, which improves initial loading times and enhances SEO, for implementation see: src/ folder.

- File-based and Nested Routing: The app implements file-based routing, allowing easy organization and management of routes. It also supports nested routing for more complex page structures.

- React Router for Form Actions: React Router is utilized for handling form actions, providing seamless navigation and state management during form submissions, for implementation see components/ folder.

- Apollo GraphQL on the Backend: The backend of the app is prepared for serverless architecture and utilizes Apollo GraphQL for efficient and scalable data fetching and manipulation, for implemenation see server/build.ts and api/graphql.ts folders.

Getting Started
To get started with the social media app, follow the steps below:

Clone the repository: git clone https://github.com/miloIsNotAvailable/social-media-app.git

## with docker: 
```docker-compose up```
if volume error pops up, check for "vite" volume, if it does not eixst create one manually

## with npm 
- ```npm install```
- ```npm run dev```

## edit the db
- in .env paste your db link
- first build the orm: ```cd db/orm/ast && cargo build --release```
- change the ```.prisma``` file
- to submit changes in the db run ```./target/release/ast```
- on successful commit you should see ```SQL migration file generated``` message

Access the app: Open your browser and visit http://localhost:5173.