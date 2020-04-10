import json
from urllib.request import urlopen
from bs4 import BeautifulSoup
from nltk import tokenize
from nltk.sentiment.vader import SentimentIntensityAnalyzer
# from openpyxl import Workbook
import matplotlib.pyplot as plt
from wordcloud import WordCloud, STOPWORDS

sid = SentimentIntensityAnalyzer()   # VADER 감정분석기 미리 준비

sum_review = ''   # wordcloud 띄워줄때 쓸 모든 리뷰 텍스트 다 합친 문자열

with open('reviews_all.json', newline='', encoding='utf-8') as json_file:
    data = json.load(json_file)

reviews = data['reviews']

for i in range(len(reviews)):
    list = []
    if reviews[i]['perfume_id'] == 26150086:
        content = reviews[i]['content']
        sum_review += content
        list.append(content)
        lines_list = tokenize.sent_tokenize(content)
        print(lines_list)
        # 한 리뷰의 각 문장마다 감정 점수 계산
        sum = 0
        for sent in lines_list:
            ss = sid.polarity_scores(sent)
            print(ss['compound'])
            sum += ss['compound']
        sum1 = str(sum/len(lines_list)) # 문장들의 평균점수가 그 리뷰의 감정점수
        list.append(sum1)

def generate_wordcloud(text):
    wordcloud = WordCloud(font_path='framd.ttf', width=2400, height=1800, 
                            ranks_only=None, relative_scaling=0.8, stopwords = set(STOPWORDS)).generate(text)
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.show()
generate_wordcloud(sum_review)