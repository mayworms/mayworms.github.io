---
layout: base.njk
permalink: index.html
title: Nice to meet you! 👋😃 
description: mayworms.info home page
featured_image: favicon.png
---
I am a first year PhD student at the <a href="https://www.si.umich.edu" target="_blank">University of Michigan School of Information</a> (UMSI), advised by <a href="https://oliverhaimson.com/index.html" target="_blank">Dr. Oliver L. Haimson</a> and <a href="https://michaelannethomas.com" target="_blank">Dr. Michaelanne Thomas</a>.

Some of my current research interests include trans-centered online communities, content moderation, platform governance, folk theorization, and alternative online infrastructures.

I graduated from Michigan State University with a Bachelor of Arts in Social Relations and Policy in 2017, and from UMSI with a Master of Science in Information in May 2022. Prior to graduate school, I worked in public and academic libraries. 

--- 
<!-- This next part will show your top three most recent posts. You can change how readableDate looks in your .eleventy.js file-->
## Recent Blog Posts

<div id="recentpostlistdiv">
  <ul>
  {% assign top_posts = collections.posts | reverse %}
	{%- for post in top_posts limit:3 -%}
		<li><b>{{ post.data.date | readableDate }}:</b> <a href="{{ post.data.permalink }}">{{ post.data.title }}</a></li>
	{% endfor %}<li class="moreposts"><a href="blog.html">» Blog</a></li></ul>
</div>