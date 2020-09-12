# Backend and API documentation

## Databse overview
Without going as far as producing an ER diagram, this presents a basic view of the models used. Since the django rest framework was used, this is a little more complex than just providing a bunch of table representations, so just the main models interacted with are shown here.
- User
    - email (primary key)
    - pwd
    - first_name
    - last_name
- Collection
    - owner (User foreign key) (partial primary key)
    - title (partial primary key)
- Note 
    - collection (Collection foreign key) (partial primary key)
    - title (partial primary key)
    - keywords (Keyword foreign key) (many to many field)
    - notes 

## API overview
With the backend being aided by the django rest framework, a lot of routes are automatically generated. If you're interested, you can read more on the [Django Rest Framework](https://www.django-rest-framework.org/). Apart from the inital authentication routes, all other routes require the token to be passed in the Authorization header of the request, otherwise a 401 is returned.
- /api/user/
    - /login/ : POST 
        - params : email, pwd
        - returns : token
    - /register/ : POST
        - params : first, last, email, pwd
        - returns : token
    - /logout/ : GET
        - params : 
        - returns : 
    - / : GET
        - params : 
        - returns : dict of account info the fills the auth redux state component
- /api/collection/
    - / : POST
        - params : title
        - returns : dict of the new collection, including it's id
    - / : GET 
        - params : 
        - returns : dict of all the user's collections (initally all set to false)
    - /:id/ : GET
        - params : 
        - returns : contents of the collection 'id' specified in URL
    - /:id/ : PATCH
        - params : title
        - returns : update contents of collection 'id'
    - /:id/ : DELETE
        - params : 
        - returns : 
- /api/note/
    - / : POST
        - params : title, collection, notes, keywords
        - returns : contents of newly created note including id
    - /:id/ : PATCH
        - params : title, notes
        - returns : contents of update note
    - /:id/ : DELETE
        - params : 
        - returns : 
- /api/keyword/
    - / : POST
        - params : note, keyword
        - returns : 
    - /:note/ : DELETE
        - params : keyword
        - returns : 

