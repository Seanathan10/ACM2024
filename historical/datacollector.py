import json, os
from collections import defaultdict
from datetime import datetime

# list of malformed files (entirely empty or missing bike data for some reason)
ILLEGAL_FILES: set = set(['stations-1725504966.json', 'stations-1726041723.json', 'stations-1726042515.json', 'stations-1726043272.json', 'stations-1726043848.json', 'stations-1726044254.json', 'stations-1726044615.json', 'stations-1726045321.json', 'stations-1726046087.json', 'stations-1726046773.json', 'stations-1726047221.json', 'stations-1726047644.json', 'stations-1726048270.json', 'stations-1726048909.json', 'stations-1726049676.json', 'stations-1726050383.json', 'stations-1726050922.json', 'stations-1726051279.json', 'stations-1726051852.json', 'stations-1726052441.json', 'stations-1726053274.json', 'stations-1726053797.json', 'stations-1726054278.json', 'stations-1726054872.json', 'stations-1726055442.json', 'stations-1726056139.json', 'stations-1726056962.json', 'stations-1726057802.json', 'stations-1726058980.json', 'stations-1726059919.json', 'stations-1726060565.json', 'stations-1726061252.json', 'stations-1726061699.json', 'stations-1726062084.json', 'stations-1726062655.json', 'stations-1726063301.json', 'stations-1728459692.json'])
PATH_TO_DATA: str = "../bcycle-santa-cruz/data/raw/"

globalDict: dict = defaultdict(list)
files: list[str] = [f for f in os.listdir(PATH_TO_DATA) if os.path.isfile(os.path.join(PATH_TO_DATA, f)) and f.endswith(".json")]

# goes through the 750MB of historical data and compresses it into a single 46MB json file with the station id, timestamp, available docks, available bikes
def generateJSONData() -> None:
    for stationDataFile in files:
        if stationDataFile in ILLEGAL_FILES: continue

        with open(PATH_TO_DATA + stationDataFile, "r") as file:
            data: list[dict] = json.load(file)
            for i in range(len(data)):
                stationID: str = data[i]["station_id"]
                try:
                    infoDict: dict = {
                        "timestamp": data[i]["last_reported"],
                        "num_docks_available": data[i]["num_docks_available"],
                        "num_bikes_available": data[i]["num_bikes_available"]
                    }
                except Exception as e:
                    pass

                globalDict[stationID].append(infoDict)
    
    with open("historical/bigfile.json", "w") as file:
        json.dump(globalDict, file)
        
# goes through the 46MB json file and calculates the hourly average. outputs a 47KB json file with station timestamp and dictionary for average hourly docks and average hourly bikes
def calculateAverageHourly():
    with open("historical/bigfile.json", "r") as file:
        allData = json.load(file)

    hourlyAverage: dict = defaultdict(list)
    print(len(allData.keys()))
    
    for stationID in allData:
        hourlyAverageDockData: dict = defaultdict(lambda: {'sum': 0, 'count': 0})
        hourlyAverageBikeData: dict = defaultdict(lambda: {'sum': 0, 'count': 0})

        for data in allData[stationID]:
            dt: datetime = datetime.fromtimestamp(data["timestamp"])
            hourlyAverageDockData[dt.hour]['sum']   += data["num_docks_available"]
            hourlyAverageDockData[dt.hour]['count'] += 1

            hourlyAverageBikeData[dt.hour]['sum']   += data["num_bikes_available"]
            hourlyAverageBikeData[dt.hour]['count'] += 1
        
        hourlyAverageDockData = {hour: round(data['sum'] / data['count']) for hour, data in hourlyAverageDockData.items()}
        hourlyAverageBikeData = {hour: round(data['sum'] / data['count']) for hour, data in hourlyAverageBikeData.items()}

        hourlyAverage[stationID] = [hourlyAverageDockData, hourlyAverageBikeData]

    with open("historical/hourlyAverage.json", "w") as file:
        json.dump(hourlyAverage, file)

        
if __name__ == "__main__":
    calculateAverageHourly()