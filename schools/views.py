from .models import Course
from .models import Department
from .models import Major
from .models import School

from .serializers import CourseSerializer
from .serializers import DepartmentSerializer
from .serializers import MajorSerializer
from .serializers import SchoolSerializer

from rest_framework import generics

class SchoolListCreate(generics.ListCreateAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer



class DepartmentListCreate(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class CourseListCreate(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class MajorListCreate(generics.ListCreateAPIView):
    queryset = Major.objects.all()
    serializer_class = MajorSerializer