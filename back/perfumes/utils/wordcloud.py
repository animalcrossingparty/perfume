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

engine = create_engine('mssql+pymssql:/root:password@host/laure_richis', echo=True)
figfile = BytesIO()
start = time.time()

def text(reviews):
    sum_review = ''
    for review in reviews:
        sum_review += review.content
    return sum_review

def generate_wordcloud(text):
    icon = Image.open("perfume_mask.png")
    mask = Image.new("RGB", icon.size, (255,255,255))
    mask.paste(icon, icon)
    perfume_mask = np.array(mask)
    img_colors = ImageColorGenerator(perfume_mask)
    wordcloud = WordCloud(background_color="white",font_path='framd.ttf', max_words=100,
                            random_state=42, mask=perfume_mask, stopwords = set(STOPWORDS)).generate(text)
    plt.imshow(wordcloud.recolor(color_func=img_colors), interpolation="bilinear")
    plt.axis("off")
    plt.savefig(figfile, format='png')
    figfile.seek(0)
    string = base64.b64encode(figfile.getvalue())

    img_df = pd.DataFrame({'image_data': [string]})
    image_64 = 'data:image/png;base64,' + urllib.parse.quote(string)
    img_df.to_sql('images', con=engine, if_exists='append', index=False)

    return image_64
    # plt.show()
if __name__ == '__main__':
    generate_wordcloud(text(reviews))
# print("time: ", time.time() - start)
