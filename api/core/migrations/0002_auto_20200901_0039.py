# Generated by Django 3.1 on 2020-09-01 00:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='note',
            old_name='keyword',
            new_name='keywords',
        ),
    ]
