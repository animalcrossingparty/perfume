import pandas as pd
import numpy as np
import matplotlib.pyplot as plt


users = pd.read_json('./data/users_all.json')
perfumes = pd.read_json('./data/perfumes.json')
reviews = pd.read_json('./data/reviews_all.json')


reviews_pivot = reviews[['user_id', 'perfume_id', 'rate']].pivot(index = 'user_id', columns = 'perfume_id', values = 'rate')

reviews_pivot.columns = reviews_pivot.columns.astype(str)

perfume_recommend = reviews_pivot['26150183']


similar= reviews_pivot.corrwith(perfume_recommend)
corr = pd.DataFrame(similar, columns=['pearsonR'])


corr.dropna(inplace=True)

corr_top = corr[corr['pearsonR'] > 0.1].sort_values('pearsonR', ascending=False)


df = pd.DataFrame(columns=['name', 'score'])

for id in corr_top.index:
    df.loc[df.shape[0], ['name', 'score']] = [perfumes.loc[perfumes['perfume'] == int(id), 'name'].to_list()[0], corr_top['pearsonR'][id]]
    
    
df.head(5)
