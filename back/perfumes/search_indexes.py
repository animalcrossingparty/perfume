from haystack import indexes
from perfumes.models import Perfume

class PerfumeIndex(indexes.SearchIndex, indexes.Indexable):
    name = indexes.CharField(document=True)
    launch_date = indexes.DateField(model_attr='launch_date')

    def get_model(self):
        return Perfume

    def index_queryset(self, using=None):
        return self.get_model().objects.all()[:20]