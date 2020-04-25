# Generated by Django 3.0.4 on 2020-04-25 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('perfumes', '0020_perfume_price'),
    ]

    operations = [
        migrations.CreateModel(
            name='Base64Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.BinaryField()),
            ],
        ),
        migrations.AddField(
            model_name='brand',
            name='image',
            field=models.BinaryField(null=True),
        ),
        migrations.AlterField(
            model_name='perfume',
            name='thumbnail',
            field=models.BinaryField(null=True),
        ),
        migrations.AddField(
            model_name='review',
            name='images',
            field=models.ManyToManyField(to='perfumes.Base64Image'),
        ),
    ]