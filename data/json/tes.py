import json

with open('perfumes3.json', encoding='utf-8') as json_file:
    data = json.load(json_file)
    print(data[0]['pk'])
    for i in range(len(data)):
        if data[i]['fields']['brand'] > 3255:
          print(i)
