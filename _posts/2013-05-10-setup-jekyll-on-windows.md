---
layout: post
title: "在 Windows 上安装 Jekyll"
description: "如何在 Windows 上安装 Jekyll"
category: articles
tags: [jekyll, ruby]
alias: [/2013/05/10/]
js_utils: fancybox, toc, unveil
---
{% include JB/setup %}

> 原文已于2013年9月10日更新，请点击[本链接](http://yizeng.me/2013/05/10/setup-jekyll-on-windows/)查看最新版本

<div id="toc"></div>

## <a id="install-ruby"></a>安装 Ruby

1. 前往 <http://rubyinstaller.org/downloads/>
2. 下载 `rubyinstaller-2.0.0-p0-x64.exe`
3. 通过安装包安装
	- 最好保持默认的路径 C:\Ruby200-x64，因为安装包明确提出 “请不要使用带有空格的文件夹 (如： Program Files)”。
	- 勾选 "Add Ruby executables to your PATH"
	
<a class="post-image" href="/assets/images/posts/2013-05-11-ruby-installer.png" title="Windows Ruby 安装包">
	<img itemprop="image" data-src="/assets/images/posts/2013-05-11-ruby-installer.png" src="/assets/js/unveil/loader.gif" alt="Windows Ruby 安装包" />
</a>
4. 检验安装是否成功
> ruby --version

## <a id="install-devkit"></a>安装 DevKit
[Github 上完整的安装教程](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit#installation-instructions)

1. 前往 <http://rubyinstaller.org/downloads/>
2. 下载 DevKit 安装包 `DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe`
3. 运行安装包并解压缩至某文件夹，如 `C:\DevKit`
4. 通过初始化来创建 config.yml
> cd "C:\DevKit"<br />
> ruby dk.rb init<br />
> notepad config.yml<br />
5. 在打开的记事本窗口中，于末尾添加新的一行 `- C:\Ruby200-x64`，保存文件并退出。
6. 在命令行窗口内，审查并安装
> ruby dk.rb review<br />
> ruby dk.rb install

## <a id="install-jekyll"></a>安装 Jekyll
1. 确保 gem 已经正确安装
> gem --version
2. 安装 Jekyll gem
> gem install jekyll

## <a id="install-pygements"></a>安装 Pygments

### <a id="install-python"></a>安装 Python
1. 前往 <http://www.python.org/download/>
2. 下载 Python windows 安装包 `Python 2.7.4 Windows Installer`
3. 添加安装路径 (如： `C:\Python27`) 至 PATH
4. 检验 Python 安装是否成功
> python --version

### <a id="install-easy-install"></a>安装 'Easy Install'
1. 前往 <https://pypi.python.org/pypi/setuptools#windows>
2. 下载 'setuptools' `setuptools-0.6c11.win32-py2.7.exe`
3. 添加 'Python Scripts' 路径 (如： `C:\Python27\Scripts`) 至 PATH

### <a id="install-pygements-2"></a>安装 Pygments
1. 确保 install 已经正确安装
> easy_install --help
2. 安装 Pygments
> easy_install Pygments

### <a id="troubleshooting"></a>故障诊断
1. 错误:

		Generating...   Liquid Exception: No such file or directory - python c:/Ruby200-x64/lib/ruby/gems/2.0.0/gems/pygments.rb-0.4.2/lib/pygments/mentos.py in 2013-04-22-hello-world.md

    **可能原因:** PATH 的添加啊还未生效

    **尝试解法:** 注销系统并重新登录<br />
2. 错误:

		c:/Ruby200-x64/lib/ruby/2.0.0/rubygems/dependency.rb:296:in `to_specs': Could not find 'pygments.rb' (~> 0.4.2) - did find: [pygments.rb-0.5.0] (Gem::LoadError)
		from c:/Ruby200-x64/lib/ruby/2.0.0/rubygems/specification.rb:1196:in `block in activate_dependencies'
		from c:/Ruby200-x64/lib/ruby/2.0.0/rubygems/specification.rb:1185:in `each'
		from c:/Ruby200-x64/lib/ruby/2.0.0/rubygems/specification.rb:1185:in `activate_dependencies'
		from c:/Ruby200-x64/lib/ruby/2.0.0/rubygems/specification.rb:1167:in `activate'
		from c:/Ruby200-x64/lib/ruby/2.0.0/rubygems/core_ext/kernel_gem.rb:48:in`gem'
		from c:/Ruby200-x64/bin/jekyll:22:in `<main>'`

   **尝试解法:** 安装 gem pygments.rb 的旧版本 0.4.2
> gem install pygments.rb -v 0.4.2
