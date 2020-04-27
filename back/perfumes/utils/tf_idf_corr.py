import pandas as pd
import json
import warnings
import pickle

warnings.filterwarnings(action='ignore')


def make(reviews_pivot, perfume_id):
    perfume_recommend = reviews_pivot[str(perfume_id)]
    similar = reviews_pivot.corrwith(perfume_recommend)
    corr = pd.DataFrame(similar, columns=['pearsonR'])
    corr.dropna(inplace=True)
    return corr[corr['pearsonR'] > 0.1].sort_values('pearsonR', ascending=False)


# @api_view(['GET'])
def recommend(perfume_id=26150183, num=5):
    f1 = open("./back/perfumes/utils/reviews_corr.pkl", "rb")
    reviews_pivot = pickle.load(f1)
    f1.close()

    corr_top = make(reviews_pivot, perfume_id)

    for id in corr_top.index[1: num + 1]:
        print(id)


if __name__ == '__main__':
    # api.run('0.0.0.0', port=5000)
    recommend()
