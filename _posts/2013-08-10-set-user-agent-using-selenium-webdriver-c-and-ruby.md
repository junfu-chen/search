---
layout: post
title: "使用 Selenium WebDriver C# 和 Ruby 给浏览器设置 User Agent"
description: "如何使用 Selenium WebDriver C# 和 Ruby 来设置浏览器（Chrome, Firefox, IE, PhantomJS）的 user agent。"
category: articles
tags: [c#, phantomjs, ruby, webdriver, selenium]
alias: [/2013/08/10/]
last_updated: January 08, 2014
utilities: highlight, toc
---
{% include JB/setup %}

本文展示了如何使用 Selenium WebDriver C# and Ruby 给 Chrome，Firefox，IE，PhantomJS 浏览器设置 User Agent 的方法。

> 环境:<br />
> Linux Mint 15, Ruby 2.0.0p247, Selenium 2.39.0, ChromDriver 2.8<br/>
> Firefox 26.0, Chrome 31, PhantomJS 1.9.2

> User Agent 示例（ipad）:<br />
> Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10

<div id="toc"></div>

## <a id="chrome"></a>Chrome

### <a id="chrome-c-sharp"></a>C&#35;

{% prettify c# %}
var options = new ChromeOptions();
options.AddArgument("--user-agent=Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25");

IWebDriver driver = new ChromeDriver(options);
{% endprettify %}

### <a id="chrome-ruby"></a>Ruby

{% highlight ruby %}
require 'selenium-webdriver'

driver = Selenium::WebDriver.for :chrome, :switches => %w[--user-agent=Mozilla/5.0(iPad;\ U;\ CPU\ iPhone\ OS\ 3_2\ like\ Mac\ OS\ X;\ en-us)\ AppleWebKit/531.21.10\ (KHTML,\ like\ Gecko)\ Version/4.0.4\ Mobile/7B314\ Safari/531.21.10]
{% endhighlight %}

## <a id="firefox"></a>Firefox

### <a id="firefox-c-sharp"></a>C&#35;

{% prettify c# %}
var profile = new FirefoxProfile();
profile.SetPreference("general.useragent.override", "Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10");

IWebDriver driver = new FirefoxDriver(profile);
{% endprettify %}

### <a id="firefox-ruby"></a>Ruby

{% highlight ruby %}
require 'selenium-webdriver'

profile = Selenium::WebDriver::Firefox::Profile.new
profile['general.useragent.override'] = 'Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10'

driver = Selenium::WebDriver.for :firefox, :profile => profile
{% endhighlight %}

## <a id="phantomjs"></a>PhantomJS

### <a id="phantomjs-c-sharp"></a>C&#35;

{% prettify c# %}
var options = new PhantomJSOptions();
options.AddAdditionalCapability("phantomjs.page.settings.userAgent", "Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10");

IWebDriver driver = new PhantomJSDriver(options);
{% endprettify %}

### <a id="phantomjs-ruby"></a>Ruby

{% highlight ruby %}
require 'selenium-webdriver'

capabilities = Selenium::WebDriver::Remote::Capabilities.phantomjs('phantomjs.page.settings.userAgent' => 'Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10')

driver = Selenium::WebDriver.for :phantomjs, :desired_capabilities => capabilities
{% endhighlight %}

## <a id="ie"></a>IE
不幸但可以预见，IE 不允许 Selenium WebDriver 原生地来设置 User Agent。
[引用][Set IEDriver UA]自 IE driver 的维护者 Jim Evans：
> The IE driver does not support changing the user agent, using capabilities or otherwise. Full stop.

[Set IEDriver UA]: https://groups.google.com/d/msg/selenium-users/q1f-nIn1BJY/pjnmCc3jSz4J