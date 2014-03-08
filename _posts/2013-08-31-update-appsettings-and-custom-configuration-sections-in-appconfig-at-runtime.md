---
layout: post
title: "在运行时更新 App.config 里的 AppSettings 属性及自定义配置节"
description: "如何在运行时更新（添加，修改或删除）App.config 里的 AppSettings 属性及自定义配置节"
category: articles
tags: [c#, .net]
alias: [/2013/08/31/]
utilities: highlight, toc
---
{% include JB/setup %}

<div id="toc"></div>

## <a id="app-config"></a>App.config 文件

如下为一个 `App.config` 的文件示例，将被用来讲解如何在运行时更新（添加，修改或删除）App.config 里的 AppSettings 属性及自定义配置节。

{% highlight xml %}
﻿﻿<?xml version="1.0" encoding="utf-8" ?>
<configuration>
	<configSections>
		<sectionGroup name="geoSettings">
			<section name="summary" type="System.Configuration.NameValueSectionHandler" />
		</sectionGroup>
	</configSections>

	<appSettings>
		<add key="Language" value="Ruby" />
		<add key="Version" value="1.9.3" />
	</appSettings>

	<geoSettings>
		<summary>
			<add key="Country" value="New Zealand" />
			<add key="City" value="Christchurch" />
		</summary>
	</geoSettings>
</configuration>
{% endhighlight %}

## <a id="update-appsettings"></a>更新 AppSettings

### <a id="add-in-appsettings"></a>添加一个元素

{% highlight c# %}
Configuration config = ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None);
config.AppSettings.Settings.Add("OS", "Linux");
config.Save(ConfigurationSaveMode.Modified);

ConfigurationManager.RefreshSection("appSettings");
{% endhighlight %}

### <a id="edit-in-appsettings"></a>修改已有元素的键值

{% highlight c# %}
Configuration config = ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None);
config.AppSettings.Settings["Version"].Value = "2.0.0";
config.Save(ConfigurationSaveMode.Modified);

ConfigurationManager.RefreshSection("appSettings");
{% endhighlight %}

### <a id="remove-in-appsettings"></a>删除已有的元素

{% highlight c# %}
Configuration config = ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None);
config.AppSettings.Settings.Remove("Version");
config.Save(ConfigurationSaveMode.Modified);

ConfigurationManager.RefreshSection("appSettings");
{% endhighlight %}

## <a id="update-custom-section"></a>更新自定义配置节

### <a id="add-in-custom-section"></a>添加一个元素

{% highlight c# %}
XmlDocument xmlDoc = new XmlDocument();
xmlDoc.Load(AppDomain.CurrentDomain.SetupInformation.ConfigurationFile);

// create new node <add key="Region" value="Canterbury" />
XmlElement nodeRegion = xmlDoc.CreateElement("add");
nodeRegion.SetAttribute("key", "Region");
nodeRegion.SetAttribute("value", "Canterbury");
xmlDoc.SelectSingleNode("//geoSettings/summary").AppendChild(nodeRegion);

xmlDoc.Save(AppDomain.CurrentDomain.SetupInformation.ConfigurationFile);
ConfigurationManager.RefreshSection("geoSettings/summary");
{% endhighlight %}

### <a id="edit-in-custom-section"></a>修改已有元素的键值

{% highlight c# %}
XmlDocument xmlDoc = new XmlDocument();
xmlDoc.Load(AppDomain.CurrentDomain.SetupInformation.ConfigurationFile);

xmlDoc.SelectSingleNode("//geoSettings/summary/add[@key='Country']").Attributes["value"].Value = "Old Zeeland";

xmlDoc.Save(AppDomain.CurrentDomain.SetupInformation.ConfigurationFile);
ConfigurationManager.RefreshSection("geoSettings/summary");
{% endhighlight %}

### <a id="remove-in-custom-section"></a>删除已有的元素

{% highlight c# %}
XmlDocument xmlDoc = new XmlDocument();
xmlDoc.Load(AppDomain.CurrentDomain.SetupInformation.ConfigurationFile);

XmlNode nodeCity = xmlDoc.SelectSingleNode("//geoSettings/summary/add[@key='City']");
nodeCity.ParentNode.RemoveChild(nodeCity);

xmlDoc.Save(AppDomain.CurrentDomain.SetupInformation.ConfigurationFile);
ConfigurationManager.RefreshSection("geoSettings/summary");
{% endhighlight %}

## <a id="print-out-keys"></a>输出全部元素

{% highlight c# %}
NameValueCollection settings = ConfigurationManager.AppSettings;
// var settings = ConfigurationManager.GetSection("geoSettings/summary") as NameValueCollection;

foreach (string key in appSettings.AllKeys) {
	Console.WriteLine("{0}: {1}", key, section[key]);
}
Console.WriteLine();
{% endhighlight %}

## <a id="references"></a>参考文献

1. [Modifying app.config at runtime throws exception](http://stackoverflow.com/q/8807218/1177636)
2. [update app.config file programatically with ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None);](http://stackoverflow.com/q/8522912/1177636)
3. [Opening the machine/base Web.Config (64bit) through code](http://stackoverflow.com/q/8130085/1177636)
