## 1. 내용 기반 추천 알고리즘

### TF-IDF


- TF-IDF는 용어빈도-역문서빈도를 의미한다.
- 각 향수들이 가진 리뷰를 기반으로 다른 향수들과의 유사성을 측정한다.
$$
TF * IDF = [({용어 x가 문서에 나온 수\over문서에 있는 용어 총 개수}) \times log_{10}({문서 총 개수\over용어x가 들어있는 문서 개수})]
$$
- 위의 식을 구현하기 위해 `scikit-learn`의 tfidfvectorizer API를 사용하였다.
```python
tfidf = TfidfVectorizer(analyzer='word', ngram_range=(1, 2), min_df = 1, stop_words='english')
tfidf_matrix = tf.fit_transform(reviews['content'])
```
- 영어의 불용어(stop-words)를 제거했고, ngram_range를 1에서 2까지로 정의하였다.
- 한 향수의 리뷰가 다른 품과 얼마나 유사한지를 확인하기 위해 코사인 유사도 행렬을 구축하였다. 이를 위해 TF-IDF 간 벡터간의 점곱을 구한다.

$$
\cos\theta = {\vec{a}\cdot\vec{b} \over \lVert\vec{a}\lVert\cdot\lVert\vec{b}\lVert}
$$

```python
cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)
```

- 코사인유사도가 1에 가까울 수록 비슷한 품목임을 나타내므로, 하나의 향수가 입력이 되었을 때 코사인유사도가 큰 순서대로 비슷한 향수를 추천한다.
- 해당 향수 추천서비스에는 리뷰가 들어있는 향수에 한해서 최대 10개의 비슷한 향수가 저장되어 있다.

## 2. 행렬 인수분해를 활용한 추천알고리즘

### Matrix Factorization

- 협업필터링을 잠재 요인 모델을 활용해 구현한다.
- 행렬 인수분해 방법은 모든 항목에 독립적인 고유한 표현식을 갖고 있다고 가정을 하여 가중치가 적용된 각 속성에 대한 사용자의 강도를 합산하여 근사값(잠재 요인)을 구하는 방식이다.
- 해당 향수 추천 서비스에서는 향수의 리뷰와 평점을 기반으로 사용자에게 향수를 추천하거나 서비스를 제공한다.
- 여러 SVD 중 행렬의 대각원소(특이값) 중 상위 t개만 골라내는 truncated SVD를 사용하였다.
- 행이 향수의 고유Id, 열이 User인 피봇테이블을 생성한다.

![image-20200430191410129](C:\Users\nam\AppData\Roaming\Typora\typora-user-images\image-20200430191410129.png)

- 차원축소를 위해 scikit learn의 TruncatedSVD API를 사용한다. 차원을 12차원으로 축소시켰다.

```python
SVD = TruncatedSVD(n_components=12)
SVD_matrix = SVD.fit_transform(review_pivot)
```

- 차원이 축소된 행렬로 모든  쌍에 대한 피어슨 상관계수를 계산한다.

```python
corr = np.corrcoef(SVD_matrix)
```
- 한 향수의 값이 입력이 되면 상관점수가 0.9 이상 1 미만인 향수 10개가 추천이 된다.
- 해당 향수 추천서비스에는 리뷰가 들어있는 향수에 한해서 최대 10개의 추천 향수가 저장되어 있다.