from django.contrib.auth import get_user_model
from accounts.models import User
import pandas as pd
import json
import urllib
import sys

with open('../data/json/users_all_re-formatted.json') as f:
    users = pd.DataFrame(json.loads(line) for line in f)

print(users)

