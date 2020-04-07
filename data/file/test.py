from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json
import pandas as pd
import os
import shutil
from bs4 import BeautifulSoup
from datetime import datetime
driver = webdriver.Chrome('C:/Users/multicampus/Desktop/data/driver/chromedriver.exe')

reviews_list = [] 
# 리뷰 저장 ['유저', '프로필 이미지', '국가', '리뷰', '반응(good: '3', neutral: '2', bad: '1')', '날짜', '향수_id']
for num in range(26120000, 26120005 + 1):
    driver.get(f'http://www.basenotes.net/fragrancereviews/fragrance/{num}')
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser', from_encoding='utf-8')

    find_good_reviews = soup.find_all("div", class_ = "reviewmain review3")
    find_neutral_reviews = soup.find_all("div", class_ = "reviewmain review2")
    find_bad_reviews = soup.find_all("div", class_ = "reviewmain review1")
    
    for i in range(len(find_bad_reviews)):
        user = find_bad_reviews[i].find_all("b")
        user = user[0].get_text()
        profile_img = find_bad_reviews[i].find_all("img")
        profile_img = profile_img[0].get('src')
        date = find_bad_reviews[i].find_all("div", class_="reviewdate")
        date = date[0].get_text()
        date = date.replace('th', '')
        date = date.replace('rd', '')
        date = date.replace('nd', '')
        date = date.replace('st', '')
        date = date.replace(',', '')
        date = date.replace('Augu', 'August')
        date = date[:len(date)-2]
        if 'edited' in date:
            new_date = date.split(':')
            new_date = new_date[1][1:]
            new_date = datetime.strptime(new_date, "%d %B %Y")
        else:
            new_date = datetime.strptime(date, "%d %B %Y")

        review = find_bad_reviews[i].find_all("div", class_="reviewblurb")
        review = review[0].get_text()
        country = find_bad_reviews[i].find_all("small")
        country = country[1].get_text()
        reviews_list.append({'user': user, 'profile_img': profile_img, 'country': country, 'review': review, 'react': 1, 'date': str(new_date), 'perfume_id': num})

    for i in range(len(find_neutral_reviews)):
        user = find_neutral_reviews[i].find_all("b")
        user = user[0].get_text()
        profile_img = find_neutral_reviews[i].find_all("img")
        profile_img = profile_img[0].get('src')
        date = find_neutral_reviews[i].find_all("div", class_="reviewdate")
        date = date[0].get_text()
        date = date.replace('th', '')
        date = date.replace('rd', '')
        date = date.replace('nd', '')
        date = date.replace('st', '')
        date = date.replace(',', '')
        date = date.replace('Augu', 'August')
        date = date[:len(date)-2]
        if 'edited' in date:
            new_date = date.split(':')
            new_date = new_date[1][1:]
            new_date = datetime.strptime(new_date, "%d %B %Y")
        else:
            new_date = datetime.strptime(date, "%d %B %Y")
        review = find_neutral_reviews[i].find_all("div", class_="reviewblurb")
        review = review[0].get_text()
        country = find_neutral_reviews[i].find_all("small")
        country = country[1].get_text()
        reviews_list.append({'user': user, 'profile_img': profile_img, 'country': country, 'review': review, 'react': 2, 'date': str(new_date), 'perfume_id': num})

    for i in range(len(find_good_reviews)):
        user = find_good_reviews[i].find_all("b")
        user = user[0].get_text()
        profile_img = find_good_reviews[i].find_all("img")
        profile_img = profile_img[0].get('src')
        date = find_good_reviews[i].find_all("div", class_="reviewdate")
        date = date[0].get_text()
        date = date.replace('th', '')
        date = date.replace('rd', '')
        date = date.replace('nd', '')
        date = date.replace('st', '')
        date = date.replace(',', '')
        date = date.replace('Augu', 'August')
        date = date[:len(date)-2]
        if 'edited' in date:
            new_date = date.split(':')
            new_date = new_date[1][1:]
            new_date = datetime.strptime(new_date, "%d %B %Y")
        else:
            new_date = datetime.strptime(date, "%d %B %Y")
        review = find_good_reviews[i].find_all("div", class_="reviewblurb")
        review = review[0].get_text()
        country = find_good_reviews[i].find_all("small")
        country = country[1].get_text()
        reviews_list.append({'user': user, 'profile_img': profile_img, 'country': country, 'review': review, 'react': 3, 'date': str(new_date), 'perfume_id': num})

reviews = {'reviews': reviews_list}

with open('review_all.json', 'w', encoding="utf-8") as make_file:
    json.dump(reviews, make_file, ensure_ascii=False, indent="\t")