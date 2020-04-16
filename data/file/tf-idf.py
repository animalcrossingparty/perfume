import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel


def reviews_fields():
    with open('../json/reviews_all_re-formatted.json', encoding='utf-8', mode='r') as f:
        reviews_all = json.load(f)
    reviews_fields = [i['fields'] for i in reviews_all]
    return pd.DataFrame(reviews_fields)


def perfumes_fields():
    with open('../json/new_perfumes.json', encoding='utf16', mode='r') as f:
        perfumes = json.load(f)
    perfumes_fields = [i['fields'] for i in perfumes]
    return pd.DataFrame(perfumes_fields)


class Tf_idf():

    def item(self, id):
        return reviews_fields.loc[reviews_fields['perfume'] == id]['content'].tolist()[0]

    def item_name(self, id):
        return perfumes_fields.loc[perfumes_fields['perfume_id'] == str(id)]['name'].tolist()[0]

    def make(self):
        tf = TfidfVectorizer(analyzer='word', ngram_range=(
            1, 3), min_df=0, stop_words='english')
        tfidf_matrix = tf.fit_transform(reviews_fields['content'])
        cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)

        results = {}
        for idx, row in reviews_fields.iterrows():
            similar_indices = cosine_similarities[idx].argsort()[:-100:-1]
            similar_items = [(cosine_similarities[idx][i],
                              reviews_fields['perfume'][i]) for i in similar_indices]
            results[row['perfume']] = similar_items[1:]
        return results

    def recommend(self, item_id, num):
        cnt = 0
        df_recommend = pd.DataFrame(columns=['name', 'score', 'content'])
        for rec in self.make()[item_id]:
            if item_id == rec[1]:
                continue
            if (df_recommend['name'] == self.item_name(rec[1])).any():
                continue
            if cnt == num:
                break
            df_recommend.loc[df_recommend.shape[0]] = [
                self.item_name(rec[1]), rec[0], self.item(rec[1])]
            cnt += 1
        print(f"{self.item_name(item_id)}와 유사한 품목 {num}개...")
        print(df_recommend)
        return


if __name__ == '__main__':

    reviews_fields = reviews_fields()
    perfumes_fields = perfumes_fields()
    tf_idf = Tf_idf()

    perfume_num = 26150183
    find_num = 3

    tf_idf.recommend(perfume_num, find_num)
