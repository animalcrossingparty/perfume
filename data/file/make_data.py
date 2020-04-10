import json
import re
from datetime import datetime
from pprint import pprint
import time

all_data = []
json_list = ['dump26124998', 'dump26129996', 'dump26134996', 'dump26139996', 'dump26144996', 'dump26149996','dump26154996', 'dump26159996', 'dump26160654']
for i in range(0, len(json_list), 2):
    if i == len(json_list)-1:
        with open(f'{json_list[i]}.json', newline='', encoding='utf-8') as json_file:
            data1 = json.load(json_file)
        all_data = all_data + data1
    else:
        with open(f'{json_list[i]}.json', newline='', encoding='utf-8') as json_file:
            data1 = json.load(json_file)
        with open(f'{json_list[i+1]}.json', newline='', encoding='utf-8') as json_file:
            data2 = json.load(json_file)
        all_data = data1 + data2

reviews = {}
reviews_list = []
users = {}
users_list = []

users_name_list = {}
user_id = 0
start = time.time()
for i in range(0, len(all_data)):
    date = re.sub('th|rd|nd|st|,', '', all_data[i]['date'])
    date = re.sub('Augu', 'August', date)
    date = date[:len(date)-2]
    if 'edited' in date:
        new_date = date.split(':')
        new_date = new_date[1][1:]
        new_date = datetime.strptime(new_date, "%d %B %Y")
    else:
        new_date = datetime.strptime(date, "%d %B %Y")
    try:
        user_id = users_name_list[all_data[i]['username']]
        reviews_list.append({'review_id': i+1, 'user_id': user_id, 'perfume_id': all_data[i]['perfume'], 'content': all_data[i]['content'], 'rate': all_data[i]['rate'], 'created_at': str(new_date)})
    except:
        if user_id == 0:
            user_id += 1
            users_name_list[all_data[i]['username']] = user_id
            email = 'anonymous' + str(user_id) + '@test.com'
        else:
            user_id = max(users_name_list.values()) + 1
            users_name_list[all_data[i]['username']] = user_id
            email = 'anonymous' + str(user_id) + '@test.com'
        reviews_list.append({'review_id': i+1, 'user_id': user_id, 'perfume_id': all_data[i]['perfume'], 'content': all_data[i]['content'], 'rate': all_data[i]['rate'], 'created_at': str(new_date)})
        users_list.append({'user_id': user_id, 'user_name': all_data[i]['username'], 'password': '', 'email': email, 'profile': all_data[i]['profile_img'], 'country': all_data[i]['country'], 'gender': '', 'role': 0, 'age': 0, 'liked_perfumes': []})

reviews = {'reviews': reviews_list}
users = {'users': users_list}

with open(f'reviews_all.json', 'w', encoding="utf-8") as outfile:
    json.dump(reviews, outfile, indent="\t")
with open(f'users_all.json', 'w', encoding="utf-8") as outfile:
    json.dump(users, outfile, indent="\t")

print("time: ", time.time() - start)