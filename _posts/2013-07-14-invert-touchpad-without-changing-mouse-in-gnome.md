---
layout: post
title: "Invert touchpad without changing mouse in GNOME"
description: "How to invert touchpad to be left-handed while keep the mouse in its default right-handed mode
for Linux Mint 15 Cinnamon, which should also work for all GNOME Ubuntu system in theory."
category: articles
tags: [linux mint]
alias: [/2013/07/14/]
load_js_utils: true
---
{% include JB/setup %}

Being a left-handed touchpad, right-handed mouse user,
it bugged me that after installing Linux Mint 15 Cinnamon,
the touchpad and mouse can't be set separately through "System Settings -> Mouse and Touchpad".

However after a bit researching, a simple solution is found using GNOME's [Gsettings](https://developer.gnome.org/gio/2.34/GSettings.html), inspired by this [AskUbuntu question](http://askubuntu.com/questions/83590/how-do-i-disable-the-touchpad-using-the-upper-left-corner-on-an-hp-pavilion-dv6).

### <a id="invert-touchpad"></a>Invert touchpad

#### <a id="using-cli"></a>From Command Line

In Gsettings, there is a key called `left-handed` under `touchpad`,
controlling the behaviour of touchpad clicking,
which is a string value defaults to "mouse" but can be set to "left" or "right".

From the terminal, type in the following command to make it left-handed:

> gsettings set org.gnome.settings-daemon.peripherals.touchpad left-handed left

#### <a id="using-gui"></a>From GUI "dconf-editor"

Gsettings has a front-end GUI tool called "dconf-editor",
which uses binary blob database to maintain all setting entries with their values.
(It's kind of similar to the relationship between "Windows Regitry" and "regedit".)

1. To install `dconf-editor`, from the terminal type in:
> sudo apt-get install dconf-tools

2. To open it, press `Alt` + `F2`, then type in `dconf-editor` and hit `Enter`.

3. Press `Ctrl` + `F` to search for an entry named `touchpad` in the opened "dconf-editor" window.

4. Select the `left-handed` under `touchpad` and set its value to `left`.

<a class="post-image" href="/assets/images/posts/2013-07-14-dconf-editor-periperals-touchpad.png" title="Invert touchpad from dconf-editor">
	<img itemprop="image" src="/assets/images/posts/2013-07-14-dconf-editor-periperals-touchpad.png" alt="Invert touchpad from dconf-editor" />
</a>

### <a id="invert-mouse"></a>Invert mouse

If the mouse needs to be inverted as well, it can be done from command line, "System Settings" or "dconf-editor".
However, note that the `left-handed` entry under `peripherals.mouse` is a Boolean,
so it should be set to either "true" or "false".

> gsettings set org.gnome.settings-daemon.peripherals.mouse left-handed true