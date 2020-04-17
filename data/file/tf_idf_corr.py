import pandas as pd
import warnings
warnings.filterwarnings(action='ignore')


def perfumes_fields():
    with open('./data/new_perfumes.json', encoding='utf16', mode='r') as f:
        perfumes = json.load(f)
    perfumes_fields = [i['fields'] for i in perfumes]
    return pd.DataFrame(perfumes_fields)


def reviews_fields():
    with open('./data/reviews_all_re-formatted.json', encoding='utf-8', mode='r') as f:
        reviews_all = json.load(f)
    reviews_fields = [i['fields'] for i in reviews_all]
    return pd.DataFrame(reviews_fields)


class tf_idf_corr():

    def item(self, id):
        return reviews_fields.loc[reviews_fields['perfume'] == int(id)]['content'].tolist()[0]

    def item_name(self, id):
        return perfumes_fields.loc[perfumes_fields['perfume_id'] == str(id)]['name'].tolist()[0]

    def make_pivot(self):
        reviews_pivot = reviews_fields[['user', 'perfume', 'rate']].pivot(
            index='user', columns='perfume', values='rate')
        reviews_pivot.columns = reviews_pivot.columns.astype(str)
        return reviews_pivot

    def make(self, perfume_id):
        perfume_recommend = reviews_pivot[str(perfume_id)]
        similar = reviews_pivot.corrwith(perfume_recommend)
        corr = pd.DataFrame(similar, columns=['pearsonR'])
        corr.dropna(inplace=True)
        return corr[corr['pearsonR'] > 0.1].sort_values('pearsonR', ascending=False)

    def recommend(self, perfume_id, num):
        corr_top = self.make(perfume_id)
        df_recommend = pd.DataFrame(columns=['name', 'corr', 'content'])
        for id in corr_top.index[1: num+1]:
            df_recommend.loc[df_recommend.shape[0], ['name', 'corr', 'content']] = [
                self.item_name(id), corr_top['pearsonR'][id], self.item(id)]

        print(f"{self.item_name(perfume_id)}와 유사한 품목 {num}개...")
        print(df_recommend)
        return


if __name__ == '__main__':
    reviews_fields = reviews_fields()
    perfumes_fields = perfumes_fields()

    tf = tf_idf_corr()

    perfume_id = str(26150183)
    num = 5

    reviews_pivot = tf.make_pivot()
    tf.recommend(perfume_id, num)
