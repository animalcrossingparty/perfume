import json
import pandas as pd

from sqlalchemy import create_engine
# from django.contrib.auth import get_user_model
# from accounts.models import User
from django.db.models import Q



def selected_perfumes(survey, Perfume):
    """
    참고로 독스트링은 스웨거에 나오니까 예쁘게 쓰면 좋습니다. drf_yasg 문서에 독스트링 쓰는법 나와있으
    {
        "gender": VARCHAR,
        "age": INTEGER,
        "season": INTEGER,
        "likes": ARRAY,
        "hates": ARRAY,
        "notes": ARRAY
    }
    """
    gender = survey[0]['gender']
    age = survey[0]['age']
    season = survey[0]['season']
    hates = survey[0]['hates']
    likes = survey[0]['likes']
    category = survey[0]['notes']

    perfumes = Perfume.objects.filter(Q(gender=gender) | Q(gender=2))
    # notes = Note.objects.filter(name__contains=survey[0]['notes'])
    if hates:
        perfumes = perfumes.exclude(Q(top_notes__in=hates) | Q(heart_notes__in=hates) | Q(base_notes__in=hates))
    perfumes = perfumes.filter(Q(top_notes__in=likes) | Q(heart_notes__in=likes) | Q(base_notes__in=likes))
        
    return perfumes

def selected_perfumes_by_brand(survey):
    """
    {
        'brand': INTEGER, (brand_id)
        'category': ARRAY
    }
    """
    brand = survey[0]['brand']
    categories = survey[0]['category']

    perfumes = Perfume.objects.filter(brand=brand, categories__in=categories)

    return perfumes

if __name__ == "__main__":
    engine = create_engine('mysql+pymysql://root:password@localhost/laure_richis', convert_unicode=True)
    conn = engine.connect()

    # data = pd.read_sql_table('perfumes', conn)
    # print(data.head())
    # survey = [{
    #     "gender": 0,
    #     "age": 23,
    #     "season": [0, 1, 2, 3], # 사계절
    #     "likes": [480, 224, 510],
    #     "hates": [42, 28],
    #     "notes": ["citrus", "kimchi", "cat", ""]
    #     }]
    selected_perfumes(survey, Perfume)