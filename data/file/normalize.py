import pandas as pd
from sklearn.preprocessing import MinMaxScaler, StandardScaler
import json
import random
from pprint import pprint
with open('../json/reviews_all_re-formatted.json', newline='', encoding='utf-8') as json_file:
    data = json.load(json_file)

# reviews = data['reviews']
for review in data:
    if review['fields']['rate'] == 1:
        review['fields']['rate'] = random.randrange(0, 4, 1)
    elif review['fields']['rate'] == 2:
        review['fields']['rate'] = random.randrange(3, 7, 1)
    else:
        review['fields']['rate'] = random.randrange(6, 10, 1)


with open('../json/reviews_all_re-formatted.json', 'w', encoding="utf-8") as outfile:
    json.dump(data, outfile, indent="\t")
# dataframe = pd.DataFrame(data=data['reviews'], columns=data['reviews'][0].keys())
# print(dataframe.describe())
# # x = data.values.astype(float)
# # min_max_scaler = MinMaxScaler(min=0, max=9)
# # x_scaled = min_max_scaler.fit_transform(x)

# # data = pd.DataFrame(x_scaled)
# # print(data)

