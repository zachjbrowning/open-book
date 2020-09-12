# 📖 OPENBOOK

## Overview
Hate extensive note taking 😤😤? Sick of online open book exams with way too much content (thanks coronavirus)?? The solution: Openbook 📖. Openbook is a simple webapp that organises and stores your notes for you, with the capacity to organise and search through your notes by note titles, keywords, or the content itself. Exam mode provides a simple, uncluttered interface to quickly find your relevant notes, rather than wasting precious time thumbing through reams of unorganised notes!!

## Background
This webapp actually arose from my own frustration in note taking for a particularly content heavy exam. So, to help me during the exam (and for some serious procrastination), I built a very simple interface to store and search my notes. After the exam, I realised this might be a tool that might help other people too! Hence arose Openbook, and with it a miriad of possible extra features and functionalities that could aid the university student of today.

## System architecture
The basis for this project came from the [React app boilerplate](https://github.com/zachjbrowning/react-app-boilerplate) that I created. This means, this building blocks of the project are:
  - ⚛️ React for the frontend
  - 🧰 Redux for state management
  - 💅 Bulma for help with styling
  - 🎒 Webpack to bundle and codesplit my JS
  - 🔏 Babel to compile my js for all those browsers that struggle with ES6

On top of this, to get everything running smoothly I used:
  - 🐍 Django to work as a backend and manage the database
  - ♨️ React spring to help with frontend animations


## File overview
 - /api/ : Houses the django backend
 - /lib/ : All utility functions, the api used by the frontend, redux actions reducers and action types, localstorage management.
 - /public/ : Where public files are stored, e.g. favicon
 - /src/ 
   - /index.html : entry point for webapp
   - /index.js : binds react to the html entry point
   - /components/ : all of the react components used in the interface!

Additional information on the [backend and api](Backend_API.md) and [frontend](Frontend.md) can be found in the supporting documentation.

## Serving up the project
Given this project is being run off a VPS, a few small steps need to be taken to switch from dev to production:
 - Uncomment the STATIC_ROOT at the bottom of /api/settings.py
 - Set debug to FALSE in /api/settings.py
 - Swap the public path from '/' to '/static/' in webpack.config.js
 - Ensure whatever server setup you are using (I am using nginx) is serving up the static files for you
 - Serve up the project from django!! I am using gunicorn ([Green Unicorn](https://gunicorn.org/)) because it is much more scalable than just django but do what you will. Running serve.sh will start it using gunicorn for you.

## What's to come
The thing that I've enjoyed most about this project is it's basis in a real problem that I wanted to solve. And because of that, I've got a whole bunch of things I would like to add to the interface in the future! Stay tuned!!
 - Better text processing for the notes - support for a more comprehensive text editor that would include things like latex, bold + italics, etc.
 - The capacity to convert a collection of notes into a pdf to be used in an in person openbook exam
 - In line with the pdf generation, an index/glossary generation to speed up the lookup of notes in an exam environment
 - A flashcard feature - using the notes stored to help study for the exam, as well as to aid during the exam! (Something that I've been told by numerous people would be something that medical students would appreciate greatly for instance)
 - Better account management
 - Better site navigation - potentially have breadcrumbs appear in top left

