# Generated by Django 3.0.4 on 2020-04-25 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('perfumes', '0019_remove_note_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='perfume',
            name='price',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
    ]