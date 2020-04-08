from django.contrib.auth import get_user_model
from accounts.models import User

class EmailAuthBackend(object):
    """
    유저네임 대신 이메일로 인증을 수행하는 백엔드 모듈
    """
    def authenticate(self, request=None, username=None, password=None):
        """ 인증에 성공하면 user 오브젝트를, 실패하면 None을 리턴 """
        try:
            user = User.objects.get(email=username)
            if user.check_password(password):
                return user
        except get_user_model().DoesNotExist:
            return None

    def get_user(self, user_id):
        """ 유저아이디에서 User객체를 호출 """
        try:
            return User.objects.get(pk=user_id)
        except get_user_model().DoesNotExist:
            return None
