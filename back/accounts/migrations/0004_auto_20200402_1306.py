# Generated by Django 3.0.4 on 2020-04-02 04:06

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_user_date_of_birth'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='date_of_birth',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]