# Generated by Django 3.0.5 on 2020-04-16 04:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('perfumes', '0008_auto_20200416_1320'),
    ]

    operations = [
        migrations.AlterField(
            model_name='perfume',
            name='gender',
            field=models.IntegerField(),
        ),
    ]