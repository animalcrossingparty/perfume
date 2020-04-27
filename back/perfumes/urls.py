from django.urls import path
from . import views

urlpatterns = [
    path('', views.perfumes_list),
    path('<int:perfume_pk>', views.perfume_detail),
    path('survey/', views.ListSurvey.as_view()),
    path('survey/check/', views.nth_survey_or_not),
    path('survey/notes/', views.left_notes),
    # path('survey/filtering/', views.filtering),
    # path('<int:perfume_pk>/wordcloud/', views.make_wordcloud),
    path('<int:perfume_pk>/reviews/', views.ListReviews.as_view()),
    path('reviews/<int:review_pk>/', views.SingleReview.as_view()),
    path('reviews/<int:review_pk>/like/', views.like_review),
]
