#!/bin/bash

# Collect static files
echo "Collect static files"
python3 manage.py collectstatic --no-input

# Start server
echo "Starting server"
# python3 manage.py runserver 0.0.0.0:8000
gunicorn -w 2 -b 0.0.0.0:8000 backend.wsgi:application