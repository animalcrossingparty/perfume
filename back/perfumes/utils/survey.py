import json
import pandas as pd
from perfumes.models import Perfume, Note, Brand
from django.contrib.auth import get_user_model
from accounts.models import User
from django.db.models import Q

def selected_perfumes(survey):
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

    perfumes = Perfume.objects.filter(Q(gender=gender) | Q(gender__isnull=True) , season__in=season)
    # notes = Note.objects.filter(name__contains=survey[0]['notes'])
    if hates:
      perfumes = perfumes.exclude(Q(top_notes__in=hates) | Q(heart_notes__in=hates) | Q(base_notes__in=hates))
    
    return []
if __name__ == "__main__":
  survey = [{
    "gender": "male",
    "age": 23,
    "season": [0, 1, 2, 3], # 사계절
    "likes": ["citrus", "musk", "mint"],
    "hates": ["wood", "kimchi"],
    "notes": ["citrus", "kimchi", "cat", ""]
  }]
  selected_perfumes(survey)