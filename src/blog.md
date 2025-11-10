---
layout: base.njk
permalink: blog.html
title: Blog
description: Past blog posts
featured_image: favicon.png
---
### Tags

<!--This next part shows links to all the tags you have on your posts, ordered by frequency-->
<ul class="none">
{% for tag in collections -%}{% if tag[0] != "all" and tag[0] != "posts" %}<a href="../tags/{{ tag[0] | slugify }}.html">{{ tag[0] }}</a> ({{ tag | length }}) {% endif %}{%- endfor %}
</ul> 

---
### Posts
<!--This next part shows all of your posts tagged "posts" in reverse chronological order-->
<ul class="none">
{% assign top_posts = collections.posts | reverse %}
{%- for post in top_posts -%}
  <li><b>{{ post.data.date | readableDate }}:</b> <a href="{{ post.data.permalink }}">{{ post.data.title }}</a></li>
{% endfor %}
</ul>
