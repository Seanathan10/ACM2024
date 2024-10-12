import json, os

PATH_TO_DATA: str = "../../bcycle-santa-cruz/data/raw/"
globalDict: dict = {}

with open(PATH_TO_DATA + "stations-1725000341.json", "r") as file:
    data: list[dict] = json.load(file)
    infoDict: dict = {
        "timestamp": data["last_reported"],
        "num_docks_available": data["num_docks_available"],
        "num_bikes_available": data["num_bikes_available"]
    }
    print(data[0])