
# Books-Hub

MERN stack project which shows books based on genres. Implemented authentication using passport.js. It also allows you to add book in user's bookself.


## Features

- fetching book data for all genres
- using loading to enhance user patience
- reduce api call by storing data in redux store
- search feature
- book detailed information
- authentication with gooogle
- store favourites, currently reading book items in bookshelf
- responsive
- Routes protection
- validation and detail error information with status code
- auth using passport 
- using cookie session for browser cookies
- custom hooks
- improve styling using tailwindcss
- middleware for check user login
- handle token expiry





## Dependencies
Following are the major dependencies of the project:

- axios
- react
- vite
- react-dom
- react-redux
- react-router-dom
- react-hot-toast
- @redux-toolkit
- tailwindcss
- passport
- passport-google-oauth20
- cors
- dotenv
- express
- mongoose
- nodemon
- cookie-session
- helmet
## Installation

Install with npm

```bash
  npm install
```
    
## npm Scripts
#### Frontend:

`npm run dev`: Starts frontend in development mode

`npm run build`: Builds the frontend for production 

#### Backend:

`npm start`: Starts backend without nodemon

`npm run watch`: Starts backend using nodemon
## Environment Variables

To run this project, you will need to add the following environment variables to your backend .env file

`API_KEY`
`CLIENT_ID`
`CLIENT_SECRET`
`SECRET_KEY1`
`SECRET_KEY2`