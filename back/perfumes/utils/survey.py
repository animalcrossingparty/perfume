import json
import pandas as pd
import perfumes.models import Perfume

def selected_perfumes(perfumes):
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
    "객 체 지 향 하지만 이 속도로 작성해서는 12일안에 아무것도 만들 수가 없는걸..."
    
    perfumes[0]

if __name__ == "__main__":
  perfumes = [{
    "gender": "male",
    "age": 239,
    "season": "winter",
    "likes": ["citrus", "musk", "mint"],
    "hates": ["wood", "kimchi"],
    "notes": ["citrus", "kimchi", "cat", ""]
    ""
  }]
  selected_perfumes(perfumes)