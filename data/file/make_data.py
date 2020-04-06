import json
import re
from datetime import datetime
from pprint import pprint
import time
with open('dump26124998.json', newline='', encoding='utf-8') as json_file:
    data = json.load(json_file)

reviews = {}
reviews_list = []
users = {}
users_list = []

users_name_list = {}
user_id = 0
start = time.time()
for i in range(0, len(data)):
    date = re.sub('th|rd|nd|st|,', '', data[i]['date'])
    date = re.sub('Augu', 'August', date)
    date = date[:len(date)-2]
    if 'edited' in date:
        new_date = date.split(':')
        new_date = new_date[1][1:]
        new_date = datetime.strptime(new_date, "%d %B %Y")
    else:
        new_date = datetime.strptime(date, "%d %B %Y")
    try:
        user_id = users_name_list[data[i]['username']]
        reviews_list.append({'review_id': i+1, 'user_id': user_id, 'perfume_id': data[i]['perfume'], 'content': data[i]['content'], 'rate': data[i]['rate'], 'created_at': str(new_date)})
    except:
        if user_id == 0:
            user_id += 1
            users_name_list[data[i]['username']] = user_id
            email = 'anonymous' + str(user_id) + '@test.com'
        else:
            user_id = max(users_name_list.values()) + 1
            users_name_list[data[i]['username']] = user_id
            email = 'anonymous' + str(user_id) + '@test.com'
        reviews_list.append({'review_id': i+1, 'user_id': user_id, 'perfume_id': data[i]['perfume'], 'content': data[i]['content'], 'rate': data[i]['rate'], 'created_at': str(new_date)})
        users_list.append({'user_id': user_id, 'user_name': data[i]['username'], 'password': '', 'email': email, 'profile': data[i]['profile_img'], 'country': data[i]['country'], 'gender': '', 'role': 0, 'age': 0, 'liked_perfumes': []})

reviews = {'reviews': reviews_list}
users = {'users': users_list}

with open(f'sample_reviews5000.json', 'w', encoding="utf-8") as outfile:
    json.dump(reviews, outfile, indent="\t")
with open(f'sample_users5000.json', 'w', encoding="utf-8") as outfile:
    json.dump(users, outfile, indent="\t")

print("time: ", time.time() - start)