import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi import FastAPI, UploadFile

app = FastAPI()
origins = ["http://127.0.0.1:3000", "http://localhost:3000"]


app.add_middleware(
    CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"]
)


@app.get("/")
async def greet():
    return {"message": "hello world"}


@app.post("/img")
async def upload_img(uploaded_file: UploadFile):
    file_location = f"./uploaded_files/{uploaded_file.filename}"
    file_content = await uploaded_file.read()

    with open(file_location, "wb+") as fname:
        fname.write(file_content)

    return FileResponse(file_location)


if __name__ == "__main__":
    ip = "127.0.0.1"
    uvicorn.run("main:app", host=ip, port=8000, reload=True)
