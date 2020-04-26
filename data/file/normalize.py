import pandas as pd
import json
import random
from pprint import pprint
with open('../json/reviews.json', newline='', encoding='utf-8') as json_file:
    data = json.load(json_file)

for review in data:
    if review['fields']['rate'] == 1:
        review['fields']['rate'] = random.randrange(0, 3, 1) # 0, 1, 2, 
    elif review['fields']['rate'] == 2:
        review['fields']['rate'] = random.randrange(3, 7, 1) # 3, 4, 5, 6
    else:
        review['fields']['rate'] = random.randrange(7, 11, 1) # 7, 8, 9, 10


with open('../json/reviews.json', 'w', encoding="utf-8") as outfile:
    json.dump(data, outfile, indent="\t")
# dataframe = pd.DataFrame(data=data, columns=data[0]['fields'].keys())
# print(dataframe.describe())

