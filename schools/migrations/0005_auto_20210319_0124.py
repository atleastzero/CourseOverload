# Generated by Django 3.1.7 on 2021-03-19 01:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schools', '0004_auto_20210319_0042'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='short_name',
            field=models.CharField(max_length=100),
        ),
    ]
