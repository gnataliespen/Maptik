# Maptik
Backend - https://maptik.herokuapp.com/pins   
Frontend - https://inspiring-euclid-74d31e.netlify.com/

Maptik is a live geolocation app where users can 'pin' different locations on the map and share their own content with other users in realtime. My hope is that this app will be a fun social site that helps users get more involved in there communities.

## Getting Started
After you clone this repo to your desktop, run npm install in the root and client directories to install all dependencies. 
Once the dependencies are installed, you can run npm start in the root directory to start the server. You will then be able to access it at localhost:2000. Then in a seperate terminal run npm start in the client directory to start the front end on localhost:3000.

## Demo
To try the site out visit it here, https://inspiring-euclid-74d31e.netlify.com/ . You can login with your google account, but you can also post anonymously if you prefer.

## Features
<ul> 
  <li>Map updates in real time</li>
  <li>See pins other users drop on the map.</li>
  <li>Comment on pins</li>
  <li>Post pins for other users to see</li>
  <li>Login with google</li>
  <li>If users choose to share there location the map will move to there area</li>
</ul>

## Technologies used
<ul> 
 <li>React front end</li>
 <li>Implemented useContext and useReducer Hooks for global state management instead of Redux</li>
 <li>Integrated Social Login (Google OAuth)</li>
 <li>Dynamic map display with Mapbox</li>
 <li>Display App Changes in Realtime with Socket io</li>
 <li>Image uploads using the Cloudinary API</li>
 <li>Built on top of a node.js server</li>
 <li>MongoDB in the cloud with MongoDB Atlas</li>
 <li>Use Mongoose to create models, CRUD, search operations, and population</li>
 <li>Styled with the Semantic UI component library</li>
 <li>Use the Geolocation API to get Users' Current Location</li>
 <li>Deployed to Heroku (server) and Netlify (client)</li>
</ul>


