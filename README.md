<h1 align="center">
<br>
  <img src='https://svgshare.com/i/TML.svg' title='Life Hero' width="120" />
<br>
<br>
Life Hero
</h1>

<p align="center">A clone of the BeTheHero application, developed by @Rocketseat in the 11th Omnistack Week</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
</p>

<hr />

## View the app

<div align="center">
  <img src="https://i.ibb.co/fGqKYh1/sign-in.png" alt="Sign in page" width="600" height="350" />

  <p>
    This page is responsible for receiving the user's email and password and then authenticates to the database, after which an access token is returned to perform all operations (requests) in the API.
  </p>
</div>

<hr />

<div align="center">
  <img src="https://i.ibb.co/XxFXZJT/sign-up.png" alt="Sign up page" width="600" height="350" />

  <p>  
    This page is responsible for receiving user data, validating all fields and then creating a new record in the database. After registering, the user must wait 24 hours for the administrator to verify the veracity of the data and activate the registration.
  </p>
</div>

<hr />

<div align="center">
  <img src="https://i.ibb.co/xzsc8g8/dashboard.png" alt="Dashboard page" width="600" height="350" />

  <p>  
    This page is the dashboard, where the ONG views all incidents and performs operations.
  </p>
</div>

<hr />

<div align="center">
  <img src="https://i.ibb.co/F5hpqMJ/new-incident.png" alt="New incident page" width="600" height="350" />

  <p>    
  This page is where the ONG registers a new incident.
  </p>
</div>

<hr />

<div align="center">
  <div style="display: flex; justify-content: space-between;">
    <img src="https://i.ibb.co/SyR2Zvd/profile-part01.png" alt="Profile page" width="300" height="150" />
    <img src="https://i.ibb.co/wRDHTfr/profile-part02.png" alt="Profile page" width="300" height="150" />
  </div>

  <p>    
  This page is where the ONG registers a new incident.
  </p>
</div>

## Getting started

1. Clone this repo using `git clone git@github.com:laerthe-souza/lifehero.git`
2. Move yourself to the appropriate directory: `cd lifehero`<br />
3. Run `yarn` to install dependencies<br />
4. Run `yarn lerna bootstrap` to install the packages dependecies

### Getting started with the server

1. Move yourself to the backend folder: `cd server`
2. Create a `.env` file and add all the environment variables required
3. Run `yarn dev` to start the server

### Getting started with the web app

1. Move yourself to the frontend folder: `cd web`
2. Create a `.env` file and add all the environment variables required
2. Run `yarn start` to start the web application

### Getting started with the mobile app

1. Move yourself to the mobile folder: `cd mobile`
2. Run `yarn start` or `expo start` to start the mobile app

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) page for details.
