# Frontend documentation

## Components overview

### Wireframe 
This is the entry point for all the other components, and contains a lot of routing, as seen here:
 - PATH / : Landing (login page)
 - ELSE :
    - Nav (shows for all other pages)
    - Modal (multi purpose modal used by all components)
    - PATH /collections/ : Collections (Landing page once logged in, manage your collections)
    - PATH /collections/:book/... : Notebook (multi purpose notebook page)

### Landing
Holds the whole login page, with three different main states: home, login and register.

### Nav
Sticky nav that sits at the top of the page. Shows for all pages except landing page. Displays differently when in exam mode.

### Collections
Main home page for logged in users. Creates/deletes different collections and links to them.

### Notebook
Bit more of a complex component. Showcases an individual notebook, which is specified in the URL. Houses a couple of child components:
 - Edit : used to edit a note
 - View : used to view a note
 - Exam : essentially simplified notebook view, removes capacity to edit 


## State Management
The redux state that manages the frontend data is split into six different sections:
 - auth : Holds all the account information and authentication details
    - email
    - first_name
    - last_name
    - token
 - collection : Holds a dictionary of the user's collections. Is false if yet to be loaded. Each collection in the dict is initially set to false until it is inspected in which case it is loaded from the backend. 
 - active : Manages which notebook or note is currently being viewed or edited, and whether the view popup needs to be displayed. Also temporarily holds the categories being added if a new note is being created.
    - notebook
    - note
    - edit
    - new
    - popup
 - query : Manages the search bar query. Holds the results to the query. Is also used to show the results if a deeper search is made through all the notes in a collection.
    - queryString
    - results
    - searched
 - night : Boolean indicating whether or not night mode is active
 - modal : state for the utility modal that is used by all components. Has a title, content, warning notification and a function to be run when the modal is submitted.
    - title
    - content
    - func
    - warning