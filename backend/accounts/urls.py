
"""This module defines the URL patterns for api app
"""
from django.urls import path
from . import views

urlpatterns = [
    path('postComp/', views.ComplaintView.as_view(), name='comp_register'),
    path('region/', views.getRegions, name='region'),
    path('ctypes/', views.getCompTypes, name='ctypes'),
    path('complaints/<str:email>', views.ComplaintView.as_view(), name='complaints'),
    path('update/<email>', views.updateUserProfile, name='userProfile'),
    path('updateComp/<id>', views.updateComp, name='complaintStatus'),
    path('contact/', views.getContAddr, name='contactAddress'),
]
