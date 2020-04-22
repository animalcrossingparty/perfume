import pandas as pd
import json
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors


class Tf_idf_knn():

    def perfumes_fields(self):
        with open('../json/new_perfumes.json', encoding='utf16', mode='r') as f:
            perfumes = json.load(f)
        perfumes_fields = [i['fields'] for i in perfumes]
        return pd.DataFrame(perfumes_fields)

    def reviews_fields(self):
        with open('../json/reviews_all_re-formatted.json', encoding='utf-8', mode='r') as f:
            reviews_all = json.load(f)
        reviews_fields = [i['fields'] for i in reviews_all]
        return pd.DataFrame(reviews_fields)

    def make_pivot(self, fields):
        fields_pivot = fields[['user', 'perfume', 'rate']].pivot(
            index='perfume', columns='user', values='rate').fillna(0)
        fields_pivot.columns = fields_pivot.columns.astype(str)
        return fields_pivot

    def recommend(self, model_knn, perfume_num, n):
        df = pd.DataFrame(columns=['name', 'thumbnail'])
        distances, indices = model_knn.kneighbors(
            reviews_rate_pivot[reviews_rate_pivot.index == perfume_num].values[0].reshape(1, -1), n_neighbors=n)
        for i in range(len(distances.flatten())):
            if i == 0:
                original = perfumes_fields.loc[perfumes_fields['perfume_id'] == str(perfume_num)]
                name = original['name'].values[0]
                thumbnail = original['thumbnail'].values[0]
                print(f"{name}({thumbnail}) 향수의 추천 향수는?")
            else:
                original = perfumes_fields.loc[perfumes_fields['perfume_id'] == str(perfume_num)]
                name = original['name'].values[0]
                thumbnail = original['thumbnail'].values[0]
                df.loc[df.shape[0]] = [name, thumbnail]
        print(df)


if __name__ == '__main__':
    tf_knn = Tf_idf_knn()

    reviews_fields = tf_knn.reviews_fields()
    perfumes_fields = tf_knn.perfumes_fields()

    reviews_rate_pivot = tf_knn.make_pivot(reviews_fields)

    reviews_matrix = csr_matrix(reviews_rate_pivot.values)
    model_knn = NearestNeighbors(n_neighbors=5, metric='cosine', algorithm='auto')
    model_knn.fit(reviews_matrix)

    perfume_num = 26149998

    tf_knn.recommend(model_knn, perfume_num, 10)
