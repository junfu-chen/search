---
layout: post
title: "创建自定义的 Jekyll 404 页面"
description: "如何给保存在 GitHub Pages 上的网站创建自定义的404页面，并使用 HTML meta 标签使之能在一段时间后自动跳转回主页。"
category: articles
tags: [jekyll, github]
alias: [/2013/05/26/]
---
{% include JB/setup %}

###Preface###
The article is about Jekyll sites hosted on [GitHub Page](http://pages.github.com/),
things might be different if sites are hosted by other means.
Also it's worth noting that custom 404 pages will only work for sites which are using custom domains.
For more detailed official GitHub Pages documentation, please see [Custom 404 Pages - GitHub Help](https://help.github.com/articles/custom-404-pages). 

###Create 404.html file###
Create `404.html` in the root directory of Jekyll site, which has to be an HTML file.

###Add YAML Front Matter###
The goal is to create a custom 404 page like all other pages using the same Jekyll theme, without creating a separate designed 404.html. Therefore, add [YAML Front Matter](http://jekyllrb.com/docs/frontmatter/) section to the top of the 404.html and set the layout to be "page".

	---
	layout: page
	title: 404
	---

###Add 404 content###
Add the actual 404 content after the [YAML Front Matter](http://jekyllrb.com/docs/frontmatter/) section. 

	---
	layout: page
	title: 404
	---
	<p>Sorry this page does not exist =(</p>

###Redirect 404 page automatically###
In order to redirect 404 page automatically, the easiest way I found so far is to use HTML meta tag, `meta http-equiv="refresh"`.

1. In Jekyll's default.html (e.g. mine resides in /_includes/themes/THEME_NAME/default.html), add a `<meta>` tag in the `<head>`. ([W3schools example](http://www.w3schools.com/tags/att_meta_http_equiv.asp))

2. Set the meta tag's `http-equiv` attribute to be "refresh", i.e `<meta http-equiv="refresh">`.

3. Set meta tag's content attribute to something like `content="5; url=/"`.
	- `5` is the number of seconds to wait before automatically redirecting. Setting to `0` means immediate redirecting.
	- `url=/` sets the URL to be redirected to, which can also be set to any URLs like `url=http://yizeng.me` etc.

4. Use [Liquid's if-else](http://wiki.shopify.com/Liquid#If_.2F_Else_.2F_Unless) statement to ensure the auto-redirecting happens to `404.html` only.
<script src="https://gist.github.com/yizeng/a4f26459bc8795476ed4.js"></script>

<br />
**Here is a completed example of `default.html`:**
<script src="https://gist.github.com/yizeng/5428d29c3d5af224475b.js"></script>

###Test 404 page###

1. Build Jekyll server locally using `jekyll serve`, then go to URL `localhost:4000/404.html`, see if the custom 404 page works or not.

2. Push to GitHub if everything looks fine.

3. Go to the live site using the custom domain with a nonexistence URL, e.g. [yizeng.me/go_404](http://yizeng.me/go_404), see how the page looks and check if it's gonna be redirected automatically or not.

