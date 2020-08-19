# React Frontend Dev Boilerplate


## Description
A good starting point for developing a react app! It uses - 
 - ⚛️ React (DUHH) for the frontend
 - 🧰 Redux for state management
 - 💅 Bulma for some styling
 - 🎒 Webpack to bundle up all your modules
 - 🔏 Babel to compile all your javascript
 - ⏩ Express for a minimal backend

## Developing

### Before you start
To get started, run 'npm install' to download all of the packages associated with the project. Or use Yarn if that's you!!

### Running the app
For development, 'npm run dev' will use a webpack development server. It will do all the chunk splitting and the good stuff, but will still live reload. For a production server, 'npm run build' will get webpack to bundle everything up and place it in the 'dist' folder for distributuion. 'npm run start' starts the express server, working from the dist folder. Please note the files are hashed, so every production build will place more files in the dist folder. It may be worth flushing this out on every build as well.




## Webpack things

### Loaders
Loaders are included and should work straight away for js, html, css, sass and any static files. 

### Bundling and splitting
Webpack has been used to split up bundles. The chunknames are hashed so that any cached files are updated when changed. To aid the splitting, I would really reccomend using react-loadable as a way to lazy load and split up any chunks that can be. React-loadable comes ready to go in the boilerplate, but if you're interested, you can read more at https://www.npmjs.com/package/react-loadable. 


## Frontend-backend things

### Express
Currently the backend is just about as minimal as it gets. Inside server/index.js you will see that there is an open regex that collects all the urls and redirect them to the entry point of the app. There are two example links to the frontend, which you can explore more in the api part.

### API
An example of how to link up between the frontend and backend using axios is set up in the lib/api folder. This can be use however you like to make REST like calls to the express backend. Or, if you want, you could expand past express and use something more complex!!

## State management 

### Redux
Redux is used for state management. The actions, reducers and store have been set up in /lib/redux. A good protocol to follow is to define the action types in types.js, then import them for each file. Add as many reducers as you want and join them in index.js.

### Redux-thunk
Thunk is being used for middleware. This means your actions are functions! Go nuts and do whatever you please inside the redux actions, just set up the function like shown to make sure you get the capacity for the asynchronous nature. One slight issue I've come across is that for some reason the actions can't access regeneratorRuntime when run. Simple fix, put 
```import regeneratorRuntime from "regenerator-runtime";```
at the top of your action files. It will import it but not use it, the main thing is that it is in scope.

### Redux dev-tools
Redux is being used with devtools. This means you can view the redux store using chrome devtools if you wish (highly reccomend). Would advise removing this plugin for production modes. 

## Styling

### Bulma
Bulma has been used as a styling framework. It is installed as a module. Feel free to use whatever you are comfortable with instead.

### Sass modules
Sass modules are being used but you can still use css if you like. Create sass modules for each group of components, and import each class as needed into the components. Be sure to name your sass files ```<name>.module.scss```. See an example in Base.js. The global controls, especially for Bulma, are in /styles/styles.scss. Feel free to play with them however you like. It would be worth experimenting with importing less of Bulma to reduce inital packet sizes.
