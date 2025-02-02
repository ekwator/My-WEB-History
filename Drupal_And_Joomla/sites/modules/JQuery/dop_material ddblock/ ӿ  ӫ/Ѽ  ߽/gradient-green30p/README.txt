************************************************************
* Dynamic display block module theme: gradient-green30p    *
* Copyright(c) 2009 P. Blaauw All rights reserved.         *
* Version 1.4(27-SEP-2009)                                 *
************************************************************

Information
-----------

* Horizontal layout.
* Configurable slide and slidetext effects.
* Slide text configurable at top, left, bottom or right side.
* Pager configurable on left or right side.
* Number Pager contains links to the slides.

Theme directory structure
-------------------------

The gradient-green30p theme contains the following directories and files:

gradient-green30p3.jpg
README.txt
custom/
--boxes/
----boxes.css
----images/
------image_box_10/
--------white/
----------1_top.png
----------3_right.png
----------5_bottom.png
----------7_left.png
----------9_corners.png
--corners/
----corners.css
----images/
------green_border_d8e7d9/
--------bl.png
--------br.png
--------tl.png
--------tr.png
------green_d8e7d9/
--------bl.png
--------br.png
--------tl.png
--------tr.png
--gradients/
----green_white/
------gradient_vert_46px.png
------gradient_vert_46px_dark.png
----white_green/
------gradient_vert_46px.png
------gradient_vert_46px_dark.png
--modules/
----ddblock/
------ddblock-cycle-block-content.tpl.php
------ddblock-cycle-block-content-gradient-green30p.tpl.php
------ddblock-cycle-pager-content.tpl.php
------ddblock-cycle-pager-content-gradient-green30p.tpl.php
------images/
--------readmore.png
--------readmore-hover.png
--------transparent_bg.png
------gradient-green30p/
--------ddblock-cycle-gradient-green30p.css

Installation
------------

1.) Copy the custom directory with all sub directories to the theme directory of the theme you use.
    (which is probably at sites/all/themes/[YOUR_THEME_NAME]/)

You need to add the following line to the info file of the drupal theme you use

stylesheets[all][]   = custom/boxes/boxes.css
stylesheets[all][]   = custom/corners/corners.css

You can find other Installation information in the Advanced dynamic display block tutorial at:
http://ddblock.myalbums.biz/node/747
    

Configuration
-------------
1.) Goto the dynamic display block configuration screen.
2.) Choose custom for the template 
3.) Type gradient-green30p as the custom template name

You can find other configuration settings in the Advanced dynamic display block tutorial at:
http://ddblock.myalbums.biz/node/747

Support
-------
Frequently asked questions about the Dynamic display block module and the themes can be found at:
http://ddblock.myalbums.biz/faq
http://themes.myalbums.biz/faq

Information about installation and configuration of the themes can be found in the Advanced dynamic display block tutorial at: http://ddblock.myalbums.biz/node/747

You can find and report issues with the dynamic display block module on drupal.org at:
http://drupal.org/project/issues/ddblock



