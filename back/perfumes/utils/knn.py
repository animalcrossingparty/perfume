import pandas as pd
import json
import pickle
import warnings
warnings.filterwarnings(action='ignore')

# @api_view(['GET'])


def recommend(perfume_num, n=10):
    global lst
    f1 = open("./data/reviews_knn.pkl", "rb")
    f2 = open("./data/model_knn.pkl", "rb")
    reviews_pivot = pickle.load(f1)
    model_knn = pickle.load(f2)
    f1.close()
    f2.close()
    try: 
        reviews_pivot[reviews_pivot.index == perfume_num].values[0]
        dist, idx = model_knn.kneighbors(reviews_pivot[reviews_pivot.index == perfume_num].values[0].reshape(1, -1), n_neighbors=n)
        recommend_perfume = [reviews_pivot.index[idx.flatten()[i]] for i in range(1, len(dist.flatten()))]
        temp = {
                "pk": perfume_num,
                "recommend": recommend_perfume
            }
        lst.append(temp)
    except:
        return


# if __name__ == '__main__':
    # api.run('0.0.0.0', port=5000)
