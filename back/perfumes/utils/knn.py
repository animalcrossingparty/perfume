import pandas as pd
import json
import pickle
import warnings
warnings.filterwarnings(action='ignore')

# @api_view(['GET'])


def recommend(perfume_num=26149998, n=10):
    f1 = open("./back/perfumes/utils/reviews_knn.pkl", "rb")
    f2 = open("./back/perfumes/utils/model_knn.pkl", "rb")
    reviews_pivot = pickle.load(f1)
    model_knn = pickle.load(f2)
    f1.close()
    f2.close()

    dist, idx = model_knn.kneighbors(
        reviews_pivot[reviews_pivot.index == perfume_num].values[0].reshape(1, -1), n_neighbors=n)

    for i in range(len(dist.flatten())):
        if i != 0:
            recommend_perfume = reviews_pivot.index[idx.flatten()[i]]

            # 요기서 추천된 향수들이 쭉 나옴
            print(recommend_perfume)


if __name__ == '__main__':
    # api.run('0.0.0.0', port=5000)
