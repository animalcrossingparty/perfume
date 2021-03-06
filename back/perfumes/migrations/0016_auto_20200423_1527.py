# Generated by Django 3.0.4 on 2020-04-23 06:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('perfumes', '0015_note_kor_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='perfume',
            old_name='availibility',
            new_name='availability',
        ),
        migrations.RenameField(
            model_name='perfume',
            old_name='season',
            new_name='seasons',
        ),
        migrations.AddField(
            model_name='season',
            name='kor_name',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='perfume',
            name='launch_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
