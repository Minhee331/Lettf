from django.db import models

# Create your models here.
class Image(models.Model):
    img = models.FileField()
    def __str__(self):
        return self.img.url