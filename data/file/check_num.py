import json
import re
from datetime import datetime
from pprint import pprint
import time
import csv

with open('reviews_all.json', newline='', encoding='utf-8') as json_file:
    reviews = json.load(json_file)

with open('users_all.json', newline='', encoding='utf-8') as json_file:
    users = json.load(json_file)

reviews_by_users = {}

for i in range(len(reviews['reviews'])):
    user = reviews['reviews'][i]['user_id']
    if user in reviews_by_users.keys():
        reviews_by_users[user] += 1
    else:
        reviews_by_users[user] = 1
# print(reviews_by_users)
print("유저별 댓글 개수")
for key, value in reviews_by_users.items():
    print(f"{key}유저 : {value}개")
print('---------------------------------')

perfumes_by_users = {}

for i in range(len(reviews['reviews'])):
    user = reviews['reviews'][i]['user_id']
    if user in perfumes_by_users.keys():
        perfumes_by_users[user].append(reviews['reviews'][i]['perfume_id'])
    else:
        perfumes_by_users[user] = [reviews['reviews'][i]['perfume_id']]

print('유저별 댓글 단 향수 개수')
for key, value in perfumes_by_users.items():
    num_perfumes = len(value)
    print(f'{key} 유저: {num_perfumes}개')
print('-----------------------------------')


num_reviews_by_perfume = {}

for i in range(len(reviews['reviews'])):
    perfume = reviews['reviews'][i]['perfume_id']
    if perfume in num_reviews_by_perfume.keys():
        num_reviews_by_perfume[perfume] += 1
    else:
        num_reviews_by_perfume[perfume] = 1

# with open(f'num_reviews_by_perfume.json', 'w', encoding="utf-8") as outfile:
#     json.dump(num_reviews_by_perfume, outfile, indent="\t")

# print('향수별 댓글 개수')
num = 0
for key, value in num_reviews_by_perfume.items():
    if value != 1:
        print(f'{key} 향수: {value}개')
        num += 1
print(num)
print(len(num_reviews_by_perfume))
print('-----------------------------------')