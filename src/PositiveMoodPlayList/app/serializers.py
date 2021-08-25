from .models import Account
from rest_framework import serializers
from django.contrib.auth.hashers import make_password


class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ['username', 'password']

    def create(self, validated_data):
        user = Account(
            user_id=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
