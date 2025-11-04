from django.db import models
from wagtail.fields import StreamField
from wagtail.admin.panels import FieldPanel
from wagtail.search import index
from . import blocks as core_blocks
from wagtail.search import index
from wagtail.models import Page
class HomePage(Page):
    tagline = models.CharField(max_length=255, blank=True)
    body = StreamField([
        ("hero", core_blocks.HeroSectionBlock()),
        ("intro", core_blocks.IntroSectionBlock()),
        ("services_showcase", core_blocks.ServicesShowcaseBlock()),
        ("highlights", core_blocks.HighlightsSectionBlock()),
        ("testimonials_showcase", core_blocks.TestimonialsShowcaseBlock()),
        ("cta_section", core_blocks.CTASectionBlock()),
    ], use_json_field=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('tagline'),
        FieldPanel('body'),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('tagline')
    ]

    class Meta:
        verbose_name = "Home Page"
        verbose_name_plural = "Home Pages"

    parent_page_types = []
    subpage_types = []
