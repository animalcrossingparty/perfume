# import json
# import numpy as np
# from PIL import Image
# from urllib.request import urlopen
# from nltk import tokenize
# from nltk.sentiment.vader import SentimentIntensityAnalyzer
# # from openpyxl import Workbook
# import matplotlib.pyplot as plt
# from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
# import time
# from io import BytesIO

# figfile = BytesIO()
# start = time.time()
# sid = SentimentIntensityAnalyzer()   # VADER 감정분석기 미리 준비

# sum_review = ''   # wordcloud 띄워줄때 쓸 모든 리뷰 텍스트 다 합친 문자열

# with open('../data/file/reviews_all.json', newline='', encoding='utf-8') as json_file:
#     data = json.load(json_file)

# reviews = data['reviews']

# for i in range(len(reviews)):
#     list = []
#     if reviews[i]['perfume_id'] == 26150086:
#         content = reviews[i]['content']
#         sum_review += content
#         list.append(content)
#         lines_list = tokenize.sent_tokenize(content)
#         print(lines_list)
#         # 한 리뷰의 각 문장마다 감정 점수 계산
#         sum = 0
#         for sent in lines_list:
#             ss = sid.polarity_scores(sent)
#             print(ss['compound'])
#             sum += ss['compound']
#         sum1 = str(sum/len(lines_list)) # 문장들의 평균점수가 그 리뷰의 감정점수
#         list.append(sum1)

# def tokenizing(reviews):
#     sum_review = ''
#     for review in reviews:
#         list = []
#         sum_review += review.content
#         list.append(content)
#         lines_list = tokenize.sent_tokenize(content)
#     return sum_review

# def generate_wordcloud(text):
#     icon = Image.open("perfume_mask.png")
#     mask = Image.new("RGB", icon.size, (255,255,255))
#     mask.paste(icon, icon)
#     perfume_mask = np.array(mask)
#     img_colors = ImageColorGenerator(perfume_mask)
#     wordcloud = WordCloud(background_color="white",font_path='framd.ttf', max_words=2000,
#                             random_state=42, mask=perfume_mask, stopwords = set(STOPWORDS)).generate(text)
#     plt.savefig(figfile, format='png')
#     figfile.seek(0)
#     plt.imshow(wordcloud.recolor(color_func=img_colors), interpolation="bilinear")
    
#     # plt.imshow(perfume_mask)
#     plt.axis("off")
#     plt.show()
# generate_wordcloud(tokenizing(reviews))
# print("time: ", time.time() - start)
