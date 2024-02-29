""" This module defines classes used in the admin site to manage
    different data on the database
"""
from django.contrib import admin
from accounts.models import UserAccount, Complaint, CompTypes, Region, ContactAddress


class UserAdmin(admin.ModelAdmin):
    """Class defines display list items in user model
    """
    list_display = ['email', 'first_name', 'last_name', 'phone']


class ComplaintAdmin(admin.ModelAdmin):
    """Class defines display list items of complaint model
    """
    list_display = ['id', 'compType']


class CompTypesAdmin(admin.ModelAdmin):
    """Class defines display list items of complaint types model
    """
    list_display = ['id', 'name']


class RegionAdmin(admin.ModelAdmin):
    """Class defines display list items of region model
    """
    list_display = ['id', 'name']

class ContactAddrAdmin(admin.ModelAdmin):
    """Class defines display list items of region model
    """
    list_display = ['id', 'name']


admin.site.register(UserAccount, UserAdmin)
admin.site.register(Complaint, ComplaintAdmin)
admin.site.register(CompTypes, CompTypesAdmin)
admin.site.register(Region, RegionAdmin)
admin.site.register(ContactAddress, ContactAddrAdmin)