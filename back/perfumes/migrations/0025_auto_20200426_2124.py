# Generated by Django 3.0.4 on 2020-04-26 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('perfumes', '0024_auto_20200426_2051'),
    ]

    operations = [
        migrations.AlterField(
            model_name='brand',
            name='image',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
