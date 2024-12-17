---
layout: base.njk
permalink: blog.html
title: Blog
description: Past blog posts
featured_image: favicon.png
---

<!--This next part shows all of your posts tagged "posts" in reverse chronological order-->
<ul class="none">
{% assign top_posts = collections.posts | reverse %}
{%- for post in top_posts -%}
  <li><b>{{ post.data.date | readableDate }}:</b> <a href="{{ post.data.permalink }}">{{ post.data.title }}</a></li>
{% endfor %}
</ul>