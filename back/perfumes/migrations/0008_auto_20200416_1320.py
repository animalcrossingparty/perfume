# Generated by Django 3.0.5 on 2020-04-16 04:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('perfumes', '0007_auto_20200414_1208'),
    ]

    operations = [
        migrations.CreateModel(
            name='Season',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.AddField(
            model_name='perfume',
            name='season',
            field=models.ManyToManyField(to='perfumes.Season'),
        ),
    ]