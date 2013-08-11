---
layout: post
title: "使用 Selenium WebDriver C# 和 Ruby 给浏览器设置 User Agent"
description: "如何使用 Selenium WebDriver C# 和 Ruby 来设置浏览器（Chrome, Firefox, IE, PhantomJS）的 user agent。"
category: articles
tags: [c#, phantomjs, ruby, webdriver, selenium]
alias: [/2013/08/10/]
---
{% include JB/setup %}

本文提供了如何使用 Selenium WebDriver C# and Ruby 给 Chrome，Firefox，IE，PhantomJS 浏览器设置 User Agent 的方法。

> 环境:<br />
> Linux Mint 15, Ruby 2.0.0p247, Selenium 2.34.0, Firefox 23.0, Chrome 28, PhantomJS 1.9.1

> User Agent 示例（ipad）:<br />
> Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10

## <a id="chrome"></a>Chrome

### <a id="chrome-c-sharp"></a>C&#35;

{% highlight c# %}
new ChromeOptions().AddArgument("--user-agent=Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25");

IWebDriver driver = new ChromeDriver(options);
{% endhighlight %}

### <a id="chrome-ruby"></a>Ruby

{% highlight ruby %}
require 'selenium-webdriver'

driver = Selenium::WebDriver.for :chrome, :switches => %w[--user-agent=Mozilla/5.0(iPad;\ U;\ CPU\ iPhone\ OS\ 3_2\ like\ Mac\ OS\ X;\ en-us)\ AppleWebKit/531.21.10\ (KHTML,\ like\ Gecko)\ Version/4.0.4\ Mobile/7B314\ Safari/531.21.10]
{% endhighlight %}

## <a id="firefox"></a>Firefox

### <a id="firefox-c-sharp"></a>C&#35;

{% highlight c# %}
new FirefoxProfile().SetPreference("general.useragent.override", "Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10");

IWebDriver driver = new FirefoxDriver(profile);
{% endhighlight %}

### <a id="firefox-ruby"></a>Ruby

{% highlight ruby %}
require 'selenium-webdriver'

profile = Selenium::WebDriver::Firefox::Profile.new
profile['general.useragent.override'] = 'Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10'

driver = Selenium::WebDriver.for :firefox, :profile => profile
{% endhighlight %}

## <a id="phantomjs"></a>PhantomJS

### <a id="phantomjs-c-sharp"></a>C&#35;

{% highlight c# %}
new PhantomJSOptions().AddAdditionalCapability("phantomjs.page.settings.userAgent", "Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10");

IWebDriver driver = new PhantomJSDriver(options);
{% endhighlight %}

### <a id="phantomjs-ruby"></a>Ruby

{% highlight ruby %}
require 'selenium-webdriver'

capabilities = Selenium::WebDriver::Remote::Capabilities.phantomjs('phantomjs.page.settings.userAgent' => 'Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10')

driver = Selenium::WebDriver.for :phantomjs, :desired_capabilities => capabilities
{% endhighlight %}

## <a id="ie"></a>IE
不幸但众所周知，IE 不允许 Selenium WebDriver 原生地来设置 User Agent。
