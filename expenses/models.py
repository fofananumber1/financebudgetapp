from django.db import models

# Create your models here.

class Expense(models.Model):
    date = models.DateField() #date of expense, YYYY-MM-DD
    category = models.CharField(max_length=100) #category of expense
    amount = models.DecimalField(max_digits=10, decimal_places=2) #amount of expense
    description = models.CharField(max_length=255, blank=True) #optional description
    created_at = models.DateTimeField(auto_now_add=True) #timestamp for server

class Meta:
    ordering = ["-date", "-id"] #newest expenses first
    indexes = [
        models.Index(fields=["date"]),
        models.Index(fields=["category"]),
    ]

def __str__(self):
    return f"{self.date} {self.category} ${self.amount}"
