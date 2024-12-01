// from fastapi import FastAPI, HTTPException
// import yaml

// app = FastAPI()

// @app.post("/parse_yaml/")
// async def parse_yaml(yaml_data: str):
//     try:
//         data = yaml.safe_load(yaml_data)
//         return data
//     except yaml.YAMLError as e:
//         raise HTTPException(status_code=400, detail=str(e))