import json, csv
from pprint import pprint

"""
users_all_re-formatted.json
"""
# with open("json/users_all.json", "r", encoding="UTF-8") as json_file:
#     json_data = json.load(json_file)

# new_data = []
# for i in range(len(json_data["users"])):
#     tmp = dict()
#     user = json_data["users"][i]
#     tmp["pk"] = user["user_id"]
#     tmp["model"] = "accounts.user"
#     tmp["fields"] = user
#     del tmp["fields"]["user_id"]
#     tmp["fields"]["username"] = tmp["fields"]["user_name"]
#     del tmp["fields"]["user_name"]
#     tmp["fields"]["profile_image"] = tmp["fields"]["profile"]
#     del tmp["fields"]["profile"]
#     tmp["fields"]["like_perfumes"] = tmp["fields"]["liked_perfumes"][:]
#     del tmp["fields"]["liked_perfumes"]
#     tmp["fields"]["password"] = ""
#     new_data.append(tmp)
# # pprint(new_data)


# re_formatted_json = json.dumps(new_data, indent=4)
# with open("json/users_all_re-formatted.json", "w", encoding="UTF-8") as re_formatted:
#     re_formatted.write(re_formatted_json)

"""
reviews_all_re-formatted.json
"""
# with open("json/reviews_all.json", "r", encoding="UTF-8") as json_file:
#     json_data = json.load(json_file)

# new_data = []
# for i in range(len(json_data["reviews"])):
#     tmp = dict()
#     review = json_data["reviews"][i]
#     tmp["pk"] = review["review_id"]
#     tmp["model"] = "reviews.review"
#     tmp["fields"] = review
#     del tmp["fields"]["review_id"]
#     tmp["fields"]["user"] = tmp["fields"]["user_id"]
#     del tmp["fields"]["user_id"]
#     tmp["fields"]["perfume"] = tmp["fields"]["perfume_id"]
#     del tmp["fields"]["perfume_id"]
#     new_data.append(tmp)
# # pprint(new_data)

# re_formatted_json = json.dumps(new_data, indent=4)
# with open("json/reviews_all_re-formatted.json", "w", encoding="UTF-8") as re_formatted:
#     re_formatted.write(re_formatted_json)

"""
notes.csv
"""
# with open("all_notes.csv", "r", encoding="UTF-8") as csv_file:
#     csv_data = csv.reader(csv_file)
#     data = [row[0] for row in csv_data]
# for i in range(len(data)):
#     data[i] = {
#         "pk": i + 1,
#         "model": "perfumes.note",
#         "fields": {
#             "name": data[i]
#         }
#     }
# # pprint(data)

# re_formatted_json = json.dumps(data, indent=4)
# with open("json/notes_all_re-formatted.json", "w", encoding="UTF-8") as re_formatted:
#     re_formatted.write(re_formatted_json)

"""
perfumes.json & notes.json
"""
with open("json/perfumes.json", "r", encoding="UTF-8") as json_file:
    json_data = json.load(json_file)

# new_data = []
# for i in range(len(json_data["reviews"])):
#     tmp = dict()
#     review = json_data["reviews"][i]
#     tmp["pk"] = review["review_id"]
#     tmp["model"] = "reviews.review"
#     tmp["fields"] = review
#     del tmp["fields"]["review_id"]
#     tmp["fields"]["user"] = tmp["fields"]["user_id"]
#     del tmp["fields"]["user_id"]
#     tmp["fields"]["perfume"] = tmp["fields"]["perfume_id"]
#     del tmp["fields"]["perfume_id"]
#     new_data.append(tmp)
# pprint(new_data)

# re_formatted_json = json.dumps(new_data, indent=4)
# with open("json/reviews_all_re-formatted.json", "w") as re_formatted:
#     re_formatted.write(re_formatted_json)

'''
[
    {
        "pk": 1, 
        "model": "test.company", 
        "fields": 
        {
            "companylogo": null, 
            "phonenumber": "741.999.5554", 
            "name": "Remax", 
            "email": "home@remax.co.il"
        }
    }, 
    ...
]
'''