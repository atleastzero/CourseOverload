from django.db import models

class School(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=20)
    country = models.CharField(max_length=20)

class Department(models.Model):
    code = models.CharField(max_length=10)
    name = models.CharField(max_length=50)
    school = models.ForeignKey(School, on_delete=models.CASCADE)

class Course(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    code = models.FloatField()
    shortName = models.CharField(max_length=10)
    longName = models.TextField()
    description = models.TextField()
    units = models.PositiveIntegerField()
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    prerequisites = models.ManyToManyField("self")
    corequisites = models.ManyToManyField("self")
    postrequisites = models.ManyToManyField("self")

class Major(models.Model):
    degree = models.CharField(max_length=20)
    name = models.CharField(max_length=50)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    courses_required = models.ManyToManyField(Course)
