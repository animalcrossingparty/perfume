# Generated by Django 3.0.5 on 2020-04-13 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('perfumes', '0003_auto_20200413_2241'),
    ]

    operations = [
        migrations.AddField(
            model_name='perfume',
            name='categories',
            field=models.ManyToManyField(to='perfumes.Category'),
        ),
    ]
