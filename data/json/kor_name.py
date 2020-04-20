import json
from pprint import pprint

with open('new_note_utf-8.json', newline='', encoding='utf-8') as json_file:
    data = json.load(json_file)

with open('new_note_utf-8_kor.json', newline='', encoding='utf-8') as json_file:
    kor_data = json.load(json_file)

for i in range(len(data)):
    kor_data[i]['fields']['name'] = data[i]['fields']['name']

# for i in range(23, len(data)):
#     field = data[i]['fields']
#     field['kor_name'] = ""

# pprint(kor_data)
with open('new_note_utf-8_kor2.json', 'w', encoding="utf-8") as outfile:
    json.dump(kor_data, outfile, ensure_ascii=False, indent="\t")