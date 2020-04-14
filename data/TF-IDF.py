import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from collections import Counter


def item(id):
    return reviews.loc[df['perfume_id'] == id]['content'].tolist()[0].split(' - ')[0]


def item_name(id):
    return perfumes.loc[perfumes['perfume'] == id]['name'].tolist()[0]


def recommend(item_id, num):
    print(f"{item_name(item_id)}와 유사한 품목 {num}개...")
    recs = results[item_id][:num]
    df_recommend = pd.DataFrame(columns=['name', 'score'])
    for rec in recs:
        df_recommend.loc[df_recommend.shape[0]] = [item_name(rec[1]), rec[0]]
    return df_recommend


reviews = pd.read_json("./data/reviews_all.json")
perfumes = pd.read_json("./data/perfumes.json")


tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 3),
                     min_df=0, stop_words='english')

tfidf_matrix = tf.fit_transform(reviews['content'])

cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)

results = {}
for idx, row in reviews.iterrows():
    similar_indices = cosine_similarities[idx].argsort()[:-100:-1]
    similar_items = [(cosine_similarities[idx][i], reviews['perfume_id'][i])
                     for i in similar_indices]
    results[row['perfume_id']] = similar_items[1:]


recommend(item_id=26150183, num=30)
