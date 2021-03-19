from rest_framework import serializers
from .models import School
from .models import Department
from .models import Course
from .models import Major

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ('id', 'name', 'city', 'state', 'country')


class DepartmentSerializer(serializers.ModelSerializer):
    school = serializers.PrimaryKeyRelatedField(many=False, queryset=School.objects.all())

    class Meta:
        model = Department
        fields = ('id', 'school', 'code', 'name')


class CourseSerializer(serializers.ModelSerializer):
    school = serializers.PrimaryKeyRelatedField(many=False, queryset=School.objects.all())
    department = serializers.PrimaryKeyRelatedField(many=False, queryset=Department.objects.all())
    prerequisites = serializers.PrimaryKeyRelatedField(many=True, queryset=Course.objects.all())
    corequisites = serializers.PrimaryKeyRelatedField(many=True, queryset=Course.objects.all())

    class Meta:
        model = Course
        fields = (
            'id',
            'school',
            'department',
            'code',
            'short_name',
            'long_name',
            'description',
            'units',
            'prerequisites',
            'corequisites'
        )


class MajorSerializer(serializers.ModelSerializer):
    school = serializers.PrimaryKeyRelatedField(many=False, queryset=School.objects.all())
    courses_required = serializers.PrimaryKeyRelatedField(many=True, queryset=Course.objects.all())

    class Meta:
        model = Department
        fields = ('id', 'school', 'degree', 'name', 'courses_required')
