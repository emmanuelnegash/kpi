# coding: utf-8
from django.contrib import admin

from hub.models import ExtraUserDetail
from .models import AuthorizedApplication

# Register your models here.
admin.site.register(AuthorizedApplication)
admin.site.register(ExtraUserDetail)
admin.site.site_header = "DA Registry Admin"
admin.site.site_title = "DA Registry Admin Portal"
admin.site.index_title = "Welcome to DA Regsitry System"
