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
    school = serializers.StringRelatedField(many=False)

    class Meta:
        model = Department
        fields = ('id', 'school', 'code', 'name')


class CourseSerializer(serializers.ModelSerializer):
    school = serializers.StringRelatedField(many=False)
    department = serializers.StringRelatedField(many=False)
    prerequisites = serializers.StringRelatedField(many=True)
    corequisites = serializers.StringRelatedField(many=True)

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
    school = serializers.StringRelatedField(many=False)
    courses_required = serializers.StringRelatedField(many=True)

    class Meta:
        model = Department
        fields = ('id', 'school', 'degree', 'name', 'courses_required')
