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
def recommend(perfume_id, num):
    f1 = open("perfumes/utils/reviews_corr.pkl", "rb")
    reviews_pivot = pickle.load(f1)
    f1.close()

    corr_top = make(reviews_pivot, perfume_id)

    similar_list = []
    for id in corr_top.index[1: num + 1]:
        similar_list.append(id)

    return similar_list


if __name__ == '__main__':
    similar_dict = {}
    # api.run('0.0.0.0', port=5000)
    
    with open('ids.txt', 'r') as ids:
        id_list = list(map(int,ids.read().split(',')))

    for perfume in id_list:
        try:
            similar_dict[perfume] = recommend(perfume, 10)
        except:
            print(perfume)
            continue


    json.dumps(similar_dict, indent=4)