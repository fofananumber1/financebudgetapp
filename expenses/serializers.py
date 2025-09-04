from rest_framework import serializers
from .models import Expense

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = "__all__"  #expose all model fields
        read_only_fields = ("id", "created_at")  #client can't set these fields