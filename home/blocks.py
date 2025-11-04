from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock


class HeroSectionBlock(blocks.StructBlock):
    headline = blocks.CharBlock(required=True)
    subheadline = blocks.TextBlock(required=False)
    background_image = ImageChooserBlock(required=False)
    primary_button_text = blocks.CharBlock(required=False)
    primary_button_url = blocks.URLBlock(required=False)
    secondary_button_text = blocks.CharBlock(required=False)
    secondary_button_url = blocks.URLBlock(required=False)

    class Meta:
        template = "blocks/hero_section.html"
        icon = "image"
        label = "Hero Section"


class IntroSectionBlock(blocks.StructBlock):
    title = blocks.CharBlock(required=True)
    subtitle = blocks.CharBlock(required=False)
    content = blocks.RichTextBlock(required=True)
    image = ImageChooserBlock(required=False)
    button_text = blocks.CharBlock(required=False)
    button_url = blocks.URLBlock(required=False)

    class Meta:
        template = "blocks/intro_section.html"
        icon = "user"
        label = "Intro Section"


class ServiceItemBlock(blocks.StructBlock):
    icon = blocks.CharBlock(required=False)
    title = blocks.CharBlock(required=True)
    description = blocks.TextBlock(required=True)
    link_text = blocks.CharBlock(required=False)
    link_url = blocks.URLBlock(required=False)

    class Meta:
        icon = "cog"
        label = "Service Item"


class ServicesShowcaseBlock(blocks.StructBlock):
    heading = blocks.CharBlock(required=True)
    intro = blocks.TextBlock(required=False)
    services = blocks.ListBlock(ServiceItemBlock())

    class Meta:
        template = "blocks/services_showcase.html"
        icon = "folder-open-1"
        label = "Services Showcase"


class KeyHighlightsBlock(blocks.StructBlock):
    number = blocks.CharBlock(required=True)
    label = blocks.CharBlock(required=True)

    class Meta:
        icon = "pick"
        label = "Highlight Item"


class HighlightsSectionBlock(blocks.StructBlock):
    heading = blocks.CharBlock(required=True)
    highlights = blocks.ListBlock(KeyHighlightsBlock())

    class Meta:
        template = "blocks/highlights_section.html"
        icon = "star"
        label = "Highlights Section"


class TestimonialBlock(blocks.StructBlock):
    name = blocks.CharBlock(required=True)
    company = blocks.CharBlock(required=False)
    feedback = blocks.TextBlock(required=True)
    photo = ImageChooserBlock(required=False)

    class Meta:
        icon = "openquote"
        label = "Testimonial"


class TestimonialsShowcaseBlock(blocks.StructBlock):
    heading = blocks.CharBlock(required=True)
    subtitle = blocks.CharBlock(required=False)
    testimonials = blocks.ListBlock(TestimonialBlock())

    class Meta:
        template = "blocks/testimonials_showcase.html"
        icon = "group"
        label = "Testimonials Showcase"


class CTASectionBlock(blocks.StructBlock):
    title = blocks.CharBlock(required=True)
    subtitle = blocks.TextBlock(required=False)
    button_text = blocks.CharBlock(required=True)
    button_url = blocks.URLBlock(required=True)
    background_image = ImageChooserBlock(required=False)

    class Meta:
        template = "blocks/cta_section.html"
        icon = "plus"
        label = "Call To Action Section"
