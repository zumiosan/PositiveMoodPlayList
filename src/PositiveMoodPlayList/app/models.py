from django.db import models
from django.utils import timezone
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, _user_has_perm
from django.contrib.auth.hashers import make_password


class AccountManager(BaseUserManager):
    """
    ユーザーを作成する
    """
    def create_user(self, request, **extra_fields):
        now = timezone.now()
        if not request['user_id']:
            raise ValueError('Users must have a user id')

        user = self.model(
            user_id=request['user_id'],
            user_password=make_password(request['user_password']),
            is_active=True,
            last_login=now,
            date_joined=now,
        )

        user.save(using=self._db)
        return user

    def create_superuser(self, user_id, email, password, **extra_fields):
        request_data = {
            'user_id': user_id,
            'email': email,
            'user_password': password
        }
        user = self.create_user(request_data)
        user.is_active = True
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    """
    アカウント
    """
    class Meta:
        db_table = 'account'
    
    id = models.BigAutoField(primary_key=True)
    user_id = models.CharField(verbose_name='ユーザID', max_length=255)
    user_password = models.CharField(verbose_name='パスワード', max_length=255)
    email = models.EmailField(verbose_name='Eメール', max_length=255, unique=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = AccountManager()

    USERNAME_FIELD = 'user_id'
    REQUIRED_FIELDS = ['user_id']

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True
