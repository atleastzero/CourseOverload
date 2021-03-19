from django.urls import path

from . import views

urlpatterns = [
    path('schools/', views.SchoolListCreate.as_view()),
    path('departments/', views.DepartmentListCreate.as_view()),
    path('courses/', views.CourseListCreate.as_view()),
    path('majors/', views.MajorListCreate.as_view()),
]