from _typeshed import Self
from .models import Account
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ['user_id', 'user_password']
    
    
    def create(self, validated_data):
        user = Account(
            user_id = validated_data['user_id'],
            user_password = make_password(validated_data['user_password'])
        )
        user.save()
        return user

        