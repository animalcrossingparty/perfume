# Generated by Django 3.0.5 on 2020-04-09 02:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('perfumes', '0002_auto_20200409_1121'),
        ('accounts', '0002_auto_20200408_1138'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='like_perfumes',
            field=models.ManyToManyField(related_name='like_users', to='perfumes.Perfume'),
        ),
    ]