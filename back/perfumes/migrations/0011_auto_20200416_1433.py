# Generated by Django 3.0.5 on 2020-04-16 05:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('perfumes', '0010_auto_20200416_1402'),
    ]

    operations = [
        migrations.AlterField(
            model_name='perfume',
            name='launch_date',
            field=models.DateField(null=True),
        ),
    ]