import numpy as np
import pandas as pd
from PIL import Image
from urllib.request import urlopen
import urllib, base64
from sqlalchemy import create_engine 
import matplotlib.pyplot as plt
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
import time
from io import BytesIO
import json
import requests
from lxml.html import html5parser


start = time.time()

# with open('../data/json/reviews.json', newline='', encoding='utf-8') as json_file:
#     data = json.load(json_file)
STOPWORDS = list(STOPWORDS)
STOPWORDS += ['scent', 'note', 'perfume', 'smell', 'smells', 'lot', 'many', 'and', 
                'although', 'but', 'or', 'so', 'very', 'much', 'little',
                'smelled', 'bit', 'mostly', 'though', 'notice', 'really', 
                'one', 'less' ,'more', 'something', 'think', 'work','almost',
                'going', 'taken', 'similarity', 'thing', 'feel', 'feeling', 
                'sorry', 'Sorry', 'using', 'close', 'say', 'find', 'house',
                'nothing', 'perhaps', 'maybe', 'look', 'nose']

def making_wordcloud(data):
    perfume_ids = set()
    for review in data:
        perfume_ids.add(review['fields']['perfume'])
    perfume_ids = list(perfume_ids)

    for id in perfume_ids:
        r = requests.get(f'http://i02b208.p.ssafy.io:8000/perfumes/{id}').json()
        reviews = r['reviews']
        sum_reviews = ''
        for review in reviews:
            sum_reviews += review['content']
        figfile = BytesIO()
        icon = Image.open("perfume_mask.png")
        mask = Image.new("RGB", icon.size, (255,255,255))
        mask.paste(icon, icon)
        perfume_mask = np.array(mask)
        img_colors = ImageColorGenerator(perfume_mask)
        wordcloud = WordCloud(background_color="white",font_path='framd.ttf', max_words=100,
                                random_state=42, mask=perfume_mask, stopwords = set(STOPWORDS)).generate(sum_reviews)
        plt.imshow(wordcloud.recolor(color_func=img_colors), interpolation="bilinear")
        plt.axis("off")
        plt.savefig(figfile, format='png')
        figfile.seek(0)
        print(id)
        with Image.open(figfile) as im:
            im.save(f'static/wordcloud/{id}-wc.webp', 'webp')