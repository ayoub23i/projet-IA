from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/chatGPT")
def chatwithgbt():
    return {"Hello": "World"}
