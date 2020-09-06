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

Additional information on the [backend and api](Backend_Api.md) and [frontend](Frontend.md) can be found in the supporting documentation.
