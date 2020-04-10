import json
import os
import shutil
from multiprocessing import Pool
import time
from bs4 import BeautifulSoup
import lxml
import requests
start = time.time()
crawlstart = 26124998 # 가장 마지막에 만들어진 json 파일의
crawlend = 26160655
result = []
for num in range(crawlstart, crawlstart+5000):
    r = requests.get(f'http://www.basenotes.net/fragrancereviews/fragrance/{num}')
    soup = BeautifulSoup(r.content, 'lxml')
    for rating in range(1, 4):
        get_reviews = soup.find_all("div", class_=f"reviewmain review{rating}")
        for i in range(len(get_reviews)):
            profile_img = get_reviews[i].find_all("img")[0].get('src')
            date = get_reviews[i].find_all("div", class_="reviewdate")[0].get_text()
            review = get_reviews[i].find_all("div", class_="reviewblurb")[0].get_text()
            country = get_reviews[i].find_all("small")[1].get_text()
            user = get_reviews[i].find_all("b")[0].get_text()
            box = {'perfume': num, 'profile_img': profile_img, 'date': date, 'content': review, 'country': country, 'username': user, 'rate': rating}
            result.append(box)
with open(f'dump{num-1}.json', 'w', encoding="utf-8") as outfile:
    json.dump(result, outfile, indent="\t")
print("time: ", time.time() - start)