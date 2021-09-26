from django.db import models


class QuickPickMegaMillions(models.Model):
    created_at = models.DateField(auto_now_add=True)
    quick_pick = models.CharField(max_length=30, null=False, blank=False)

    class Meta:
        ordering: ['-created_at']

    def __str__(self):
        return f'quick_pick:{self.quick_pick}'


class QuickPickPowerball(models.Model):
    created_at = models.DateField(auto_now_add=True)
    quick_pick = models.CharField(max_length=30, null=False, blank=False)

    class Meta:
        ordering: ['-created_at']

    def __str__(self):
        return f'quick_pick:{self.quick_pick}'
