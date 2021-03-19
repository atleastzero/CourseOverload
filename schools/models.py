from django.db import models

class School(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name + " in " + self.city


class Department(models.Model):
    code = models.CharField(max_length=10)
    name = models.CharField(max_length=50)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.code


class Course(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    code = models.FloatField()
    short_name = models.CharField(max_length=100)
    long_name = models.TextField()
    description = models.TextField()
    units = models.PositiveIntegerField()
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    prerequisites = models.ManyToManyField("self")
    corequisites = models.ManyToManyField("self")
    postrequisites = models.ManyToManyField("self")
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.department.__str__() + " " + str(self.code) + ": " + self.short_name


class Major(models.Model):
    degree = models.CharField(max_length=20)
    name = models.CharField(max_length=50)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    courses_required = models.ManyToManyField(Course)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.degree + " in " + self.name + " from " + self.school.__str__()
