# Generated by Django 3.0.4 on 2020-04-26 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('perfumes', '0025_auto_20200426_2124'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='small',
        ),
        migrations.AlterField(
            model_name='image',
            name='original',
            field=models.ImageField(blank=True, upload_to='review/'),
        ),
    ]
