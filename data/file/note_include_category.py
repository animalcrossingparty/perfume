import json

with open('all_notes.json', newline='', encoding='utf-8') as json_file:
    data = json.load(json_file)

with open('../json/notes.json', newline='', encoding='utf-8') as json_file:
    data2 = json.load(json_file)


print(len(data))
print(len(data2))

for i in range(0, len(data)):
    data2[i]['fields']['category'] = data[i]['category_idx']

with open('../json/notes2.json', 'w', encoding="utf-8") as outfile:
    json.dump(data2, outfile, ensure_ascii=False,indent="\t")