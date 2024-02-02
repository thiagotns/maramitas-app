from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def index():
    return {"Hello": "World"}

@app.get("/api/menu")
def get_menus():
    return [
        { "id": 1, "startDate": '2023-01-15', "endDate": '2023-01-17' },
        { "id": 2, "startDate": '2023-01-22', "endDate": '2023-01-24' },
        { "id": 3, "startDate": '2023-01-29', "endDate": '2023-01-31' },
        { "id": 4, "startDate": 'Stark', "endDate": 'Arya' }
    ]