echo CHECK YOU HAVE DONE ALL SERVING PREP

npm run build
python3 manage.py collectstatic
#killall gunicorn 
#gunicorn api.wsgi --bind 127.0.0.1:8000
