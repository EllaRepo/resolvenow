
"""Module that converts complex data types, such as Django models or querysets,
   into JSON, XML, or other content types that can be easily consumed by
   web APIs
"""
from accounts.models import Complaint
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    """UserAccount serializer
    """
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name',
                  'is_staff', 'phone', 'password')


class ComplaintSerializer(serializers.ModelSerializer):
    """Complaint registrating serializer
    """
    class Meta:
        model = Complaint
        fields = ('image', 'email', 'compTitle', 'city', 'subCity',
                  'landmark', 'desc', 'region', 'compType', 'compSev')
