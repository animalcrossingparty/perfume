# Generated by Django 3.0.4 on 2020-04-28 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('perfumes', '0027_auto_20200427_1427'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='kor_name',
            field=models.CharField(max_length=100),
        ),
    ]