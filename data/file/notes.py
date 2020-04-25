represent_notes = [
                    "Berry", "Citrus", "Litch", "Peach", # citrus, fruits
                    "Rose", "Jasmine", "White Floral", "Orange Flower", "Wild Flower", "Bouquet", # flowers & white flowers
                    "Aquatic", "Green", "Herbal", "Lavender", "Patchouli", # green & herbal
                    "Cypress", "Vetiver", "Incense", "Cedarwood", "Sandalwood", # woody
                    "Spicy", "Tonka Bean", "Vanilla", "Amber", # spicy
                    "Gourmand", "Coffee", # sweets
                    "Musk", "Powdery" # musk
                ]

explains = [
            "라즈베리, 블루베리 등 새콤 달콤한 베리류의 향", "레몬, 오렌지, 자몽 같은 가볍고 상큼한 감귤류 향", "열대과일 리치의 부드럽고 달큰한 향", "핑크빛이 떠오르는 달콤한 복숭아 향", 
            "은은하고 고급스럽게 퍼지는 로맨틱한 장미향", "섬세하고 매혹적인 자스민 향기", "백합, 은방울꽃처럼 단아하고 부드러운 꽃향", "밝고 경쾌한 느낌을 살려주는 오렌지꽃, 네롤리 향", "들판의 풀과 함께 피어 있는 생동감 있는 꽃향", "향을 화사하고 풍성하게 만드는 다채로운 꽃향",
            "시원하고 투명한 물을 연상시키는 향", "풋풋한 나뭇잎과 풀잎의 싱그러움이 떠오르는 향", "로즈마리, 유칼립투스, 바질 등 신선하고 시원한 허브향", "은은한 허브 느낌의 라벤더 향", "쌉싸름한 매력이 느껴지는 파출리 향기", 
            "깊은 침엽수 숲속에서 느껴지는 피톤치드의 상쾌함", "서늘한 흙, 나무와 풀뿌리가 떠오르는 베티버향", "마음을 안정시켜주는 인센스 스틱을 태울 때 나는 향", "상쾌하면서도 그윽한, 숲의 향이 느껴지는 삼나무향", "따뜻하고 차분한 느낌의 샌달우드향", 
            "카다몬, 핑크페퍼, 넛맥 등 향에 신선한 포인트 역할의 스파이시", "코코넛, 캐러멜, 바닐라가 뒤섞인 듯한 통카빈향", "따뜻하고 달콤한 바닐라향", "호박(보석)에서 느낄 수 있는 따뜻하고 스윗한 느낌", "마쉬멜로우, 초콜릿, 크림처럼 기분좋은 달콤한 향", 
            "볶은 원두에서 느껴지는 그윽한 커피향", "모든 향을 부드럽게 감싸안는 관능적이고 따뜻한 향", "분말 가루같은 보송보송하고 부드러운 향"
            ]


    represents = {
        {
            'category': [1,2],
            'notes': {
                'Berry': '라즈베리, 블루베리 등 새콤 달콤한 베리류의 향', 
                'Citrus': '레몬, 오렌지, 자몽 같은 가볍고 상큼한 감귤류 향', 
                'Litch': '열대과일 리치의 부드럽고 달큰한 향', 
                'Peach': '핑크빛이 떠오르는 달콤한 복숭아 향',
            }
        },
        {
            'category': [3,4],
            'notes': {
                'Rose': '은은하고 고급스럽게 퍼지는 로맨틱한 장미향', 
                'Jasmine': '섬세하고 매혹적인 자스민 향기', 
                'White Floral': '백합, 은방울꽃처럼 단아하고 부드러운 꽃향', 
                'Orange Flower': '밝고 경쾌한 느낌을 살려주는 오렌지꽃, 네롤리 향', 
                'Wild Flower': '들판의 풀과 함께 피어 있는 생동감 있는 꽃향', 
                'Bouquet': '향을 화사하고 풍성하게 만드는 다채로운 꽃향',
            }
        },
        {
            'category': [5],
            'notes': {
                'Aquatic': '시원하고 투명한 물을 연상시키는 향', 
                'Green': '풋풋한 나뭇잎과 풀잎의 싱그러움이 떠오르는 향', 
                'Herbal': '로즈마리, 유칼립투스, 바질 등 신선하고 시원한 허브향', 
                'Lavender': '은은한 허브 느낌의 라벤더 향', 
                'Patchouli': '쌉싸름한 매력이 느껴지는 파출리 향기', 
            }
        },
        {
            'category': [8],
            'notes': {
                'Cypress': '깊은침엽수 숲속에서 느껴지는 피톤치드의 상쾌함', 'Vetiver': 
                '서늘한 흙, 나무와 풀뿌리가 떠오르는 베티버향', 
                'Incense': '마음을 안정시켜주는 인센스 스틱을 태울 때 나는 향', 
                'Cedarwood': '상쾌하면서도 그윽한, 숲의 향이 느껴지는 삼나무향', 
                'Sandalwood': '따뜻하고 차분한 느낌의 샌달우드향',
            }
        },
        {
            'category': [6],
            'notes': {
                'Spicy': '카다몬, 핑크페퍼, 넛맥 등 향에 신선한 포인트 역할의 스파이시',
            }
        },
        {
            'category': [7],
            'notes': {
                'Tonka Bean': '코코넛, 캐러멜, 바닐라가 뒤섞인 듯한 통카빈향', 
                'Vanilla': '따뜻하고 달콤한 바닐라향',
                'Gourmand': '마쉬멜로우, 초콜릿, 크림처럼 기분좋은 달콤한 향', 
                'Coffee': '볶은 원두에서 느껴지는 그윽한 커피향',
            }
        },
        {
            'category': [10],
            'notes': {
                'Amber': '호박(보석)에서 느낄 수 있는 따뜻하고 스윗한 느낌', 
                'Musk': '모든 향을 부드럽게 감싸안는 관능적이고 따뜻한 향', 
                'Powdery': '분말 가루같은 보송보송하고 부드러운 향',
            }
        },
    }
represents = {}

for i in range(len(represent_notes)):
    if i >= 0 and i < 4:
        represents['category'] = 1
        represents['category'][represent_notes[i]] = explains[i]
    elif i >= 4 and i <

for j in range(len(represents))
print(represents)

represents = {
        {
            'category': [1,2],
            'notes': {
                'Berry': '라즈베리, 블루베리 등 새콤 달콤한 베리류의 향', 
                'Citrus': '레몬, 오렌지, 자몽 같은 가볍고 상큼한 감귤류 향', 
                'Litch': '열대과일 리치의 부드럽고 달큰한 향', 
                'Peach': '핑크빛이 떠오르는 달콤한 복숭아 향'
            }
        },
        {
            'category': [3,4],
            'notes': {
                'Rose': '은은하고 고급스럽게 퍼지는 로맨틱한 장미향', 
                'Jasmine': '섬세하고 매혹적인 자스민 향기', 
                'White Floral': '백합, 은방울꽃처럼 단아하고 부드러운 꽃향', 
                'Orange Flower': '밝고 경쾌한 느낌을 살려주는 오렌지꽃, 네롤리 향', 
                'Wild Flower': '들판의 풀과 함께 피어 있는 생동감 있는 꽃향', 
                'Bouquet': '향을 화사하고 풍성하게 만드는 다채로운 꽃향',
            }
        },
        {
            'category': [5],
            'notes': {
                'Aquatic': '시원하고 투명한 물을 연상시키는 향', 
                'Green': '풋풋한 나뭇잎과 풀잎의 싱그러움이 떠오르는 향', 
                'Herbal': '로즈마리, 유칼립투스, 바질 등 신선하고 시원한 허브향', 
                'Lavender': '은은한 허브 느낌의 라벤더 향', 
                'Patchouli': '쌉싸름한 매력이 느껴지는 파출리 향기', 
            }
        },
        {
            'category': [8],
            'notes': {
                'Cypress': '깊은침엽수 숲속에서 느껴지는 피톤치드의 상쾌함', 'Vetiver': 
                '서늘한 흙, 나무와 풀뿌리가 떠오르는 베티버향', 
                'Incense': '마음을 안정시켜주는 인센스 스틱을 태울 때 나는 향', 
                'Cedarwood': '상쾌하면서도 그윽한, 숲의 향이 느껴지는 삼나무향', 
                'Sandalwood': '따뜻하고 차분한 느낌의 샌달우드향',
            }
        },
        {
            'category': [6],
            'notes': {
                'Spicy': '카다몬, 핑크페퍼, 넛맥 등 향에 신선한 포인트 역할의 스파이시',
            }
        },
        {
            'category': [7],
            'notes': {
                'Tonka Bean': '코코넛, 캐러멜, 바닐라가 뒤섞인 듯한 통카빈향', 
                'Vanilla': '따뜻하고 달콤한 바닐라향',
                'Gourmand': '마쉬멜로우, 초콜릿, 크림처럼 기분좋은 달콤한 향', 
                'Coffee': '볶은 원두에서 느껴지는 그윽한 커피향'
            }
        },
        {
            'category': [10],
            'notes': {
                'Amber': '호박(보석)에서 느낄 수 있는 따뜻하고 스윗한 느낌', 
                'Musk': '모든 향을 부드럽게 감싸안는 관능적이고 따뜻한 향', 
                'Powdery': '분말 가루같은 보송보송하고 부드러운 향'
            }
        }
    }