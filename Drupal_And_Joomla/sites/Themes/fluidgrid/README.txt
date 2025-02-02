
-----------------------------------------------------------------------

  Fluid Grid System Framework for DRUPAL
  http://drupal.org/project/fluidgrid
  
  Hubert Florin
  couzin.hub@gmail.com
  Copyright 2009 Hubert Florin
   
-----------------------------------------------------------------------

***********************************************************************
************** STILL IN THE PROCESS OF WRITING THIS PAGE **************
***************** SOME INFORMATIONS MIGHt BE OBSOLETE *****************
***********************************************************************

You can read the HTML version of the documentation documentation here :


-----------------------------------------------------------------------

Introduction to Grid System:
----------------------------

The Fluid Grid System (FGS) for DRUPAL is a theme containing a css 
framework created by Hubert Florin, inspired by Bluetrip, 960, and 
other grid systems available on internet.

  - 960 : http://960.gs/
  - Bluetrip : http://bluetrip.org/
  - Blueprint : http://www.blueprintcss.org/

These systems have been created to improve the development process of
websites. When working within a framework, it is easier for web 
developers to create complicated and flexible layouts in a very short 
time. The grid frameworks creates a set of classes that you can use 
to organize your layout. With these systems, it becomes really easy
to achieve, and modify layouts without having to write any CSS. 


Installation
----------------------------

To use the FGS theme for Drupal, you must have a running version of 
Drupal. You can download the latest version here :

http://drupal.org/project/drupal

Note that FGS is not supported by Drupal 5, so you will need to 
upgrade your drupal installation to Drupal 6 or later in order to 
use it. You can download the latest version of the FGS

http://drupal.org/project/fluidgrid

Once downloaded, place the entire folder 'fluidgrid' in one of these
two location within your drupal installation :

  - /themes/
  - /sites/all/themes/

It is consider best practice to install themes that are not provided
with Drupal in the second location, as it makes the Drupal upgrading
process way easier, but both locations work the same.

Once the folder has been placed into the folder of your choice, open
your drupal site in a web-browser (preferably not Internet Explorer,
as it's now well known that Internet Explorer has been made by evil 
forces in order to destroy the internet), and navigate to the theme
page:

  - /admin/build/themes

Here you can see the list of all the themes that Drupal can use. 
You need to be logged in as an administrator to access this page.
You should see the Fluid Grid System theme listed. To activate it,
check the box 'Enabled' and select Fluid Grid as the default theme.
Then scroll down to the bottom of the page and click on "Save 
Configuration". When the page is reloaded, you should not be seeing 
Garland anymore but the white look of the Fluid Grid system. If you
still see Garland, don't panic, it might be because the administration
theme is still Garland. If you want to change this, navigate to:

  - /admin/settings/admin
  
There you can change the theme used for admin pages. If even after 
selecting another theme than Garland as the default theme you still 
see Garland, you can start to panic :) ... but my recomendation
would be to clear all caches, and if it remains ... re-install Drupal.


Configuration
----------------------------

Once the theme is activated, click on the 'configure' link of the 
theme, or go to:

  - /admin/build/themes/settings/fluidgrid

There you can select some standard settings, but if you scroll down, 
you will notice some extra settings specific to FGS.

-- Number of columns --

First, you can select the number of columns to use. By default, it is
set to 16, but for more flexibility, you can use as many columns as 
you'd like. I would recommend with either 12 or 24 columns because 12
and 24 can be divided by 2/3/4/6/... but really, it's up to you.

Depending on which amount of columns you want to use, the theme will
use a different page template. For example, if you want to use 24 
columns, the default page template of the theme will be 
'page-24.tpl.php' and the css used will be 'fluid-grid-24.css'. The 
combination of these two files will create a layout using 24 columns.
 
If you prefer not to use one of the default page template provided,
check the option 'Use page.tpl.php'. By doing this, you still use the
chosen CSS system, but you won't use the corresponding page template.
The system will use the default page.tpl.php of the theme.

Fluid Grid System comes with an IMPROVED PAGE TEMPLATE SYSTEM. You can
override the page template in used for specific node, content type,
or even for specific path. You can for example use an alternate page
template for the node #12 by creating a page template named like this :

page-node-12.tpl.php

Or, the same way, you can create a page template for the content type 
'story' by by creating a page template named like this :

page-type-story.tpl.php

Even better, you can use a SPECIFIC PATH to be used on an alternate
page template. For example, if you want a new page template for the
path /node/add, simply create a page template named like this :

page-node-add.tpl.php

another example, if you wish to have a different page template for the
path /admin/content/comment just create a page template named like this :

page-admin-content-comment.tpl.php

If you're not sure which name to give to your page template to theme
a specific path, check the body class of the page, you should see a class
like this :

    page-admin-content-comment
or  page-user-1

You can use this class to identify how to call your page template
In the same way, you can have a page template for a specific section
of the site. Check the body class, and identify the class that looks
like this :

section-admin

You can create a page template named like this to theme the 
corresponding section :

page-section-admin.tpl.php

Note that if the body class is longer (like section-node-add), you still
only need to use the first word after section only, so 
page-section-node.tpl.php


-- Page Width --

You can also choose the width of the page. As the grid is created 
using percentages, it will adapt to the width of the page you are
choosing. Notice that if you enter a value, the layout will be 
a fixed width, and centered. To go back to a full fluid width, 
simply empty the page width input box

-- Side Margins --

If you wish to have a fluid layout but you don't want the page to 
reach the left and right sides of the browser's window, you can specify
a left and right margin to the page. Simply enter a value like '30px'
or even '5%', and your layout (only if the page width is not defined)
should have some left and right margins as defined.

-- Show / Hide Grid --

It is possible to view the grid you are working with by clicking on 
the (almost invisible) link at the bottom left of your browser's 
window : "Show/Hide Grid". The link is only available for the user #1 or 
for any role who have the permission 'administer site configuration'.

On the theme setting page you can choose if the grid should be displayed
by default, or if it should only be displayed if the link mentioned
above is clicked on. Check the box 'Show the grid by default' if you
wish to see the grid on each page reload, and uncheck it if you only 
want to see it when desired.

-- Block Edit Links --

One extra feature of the FGS is the edit link for block or menu items.
This feature is part of BASIC 2, the theme I used (and created) to 
build FGS. Basic 2 is a strip down version of Zen, and still my favorite
theme starter if you prefer not working with Grids. So this feature and
the next one are both originally from the Zen theme.

The block Edit Links, when checked, will display a link when hovering a 
block or a Drupal menu to edit the block or menu. It is very useful when
developing a new theme, but could be annoying when using the site. So 
I would recommend turning this off when the development process is over.

-- Theme registry --

Also from Basic 2 and originally from Zen, the theme registry setting
will clear the theme cache on every page reload. This is useful when
developing a new theme as some functions of the theme are cached by 
Drupal, like the one in the template.php. If you were to change these
functions or add a new one, or even remove one, you would have to visit 
the theme page in order to clear the cached version of the files and use
your new version. This is no longer necessary if the theme registry is 
checked (except if you modify the .info file, then you still have to visit
the theme page and re-submit it).

WARNING -> having the theme registry activated is very heavy on memory 
resources, and if this is fine when developing a new site, it might be a 
problem when the site goes live (it would cause your site to be very slow),
so remember to deactivate this setting once your site goes live.


Using the Grid system
----------------------------

Using the Fluid Grid System is really easy. FGS creates a set of columns
that you can use to define the layout of your page. By just giving the right 
class to your markup, you can define how wide it is. For example, if you
are using a 12 columns grid, giving the class 'span-6' to a DIV will make 
that DIV use half of the page width.

the page is divided into 12 columns:
|--- --- --- --- --- --- --- --- --- --- --- ---|
|--- --- --- --- --- --- --- --- --- --- --- ---|
|--- --- --- --- --- --- --- --- --- --- --- ---|
|--- --- --- --- --- --- --- --- --- --- --- ---|

but I gave 'span-6' to a DIV, so it's only 6 columns wide:

|--- --- --- --- --- ---|
|--- --- --- --- --- ---|
|--- --- --- --- --- ---|
|--- --- --- --- --- ---|
    div class="span-6"

If I give the class 'span-3' to the following DIV, it'll only be a quarter
of the page width (3 columns), and it'll be right beside my first DIV:

|--- --- --- --- --- ---|--- --- ---|
|--- --- --- --- --- ---|--- --- ---|
|--- --- --- --- --- ---|--- --- ---|
|--- --- --- --- --- ---|--- --- ---|
          span-6           span-3
 
I could now have a third DIV, filling the remaining space of the page, by
adding a new 'span-3' DIV after it. But as it's the last DIV I can add, I 
have to add the class 'last' to this div :

|--- --- --- --- --- ---|--- --- ---|--- --- ---|
|--- --- --- --- --- ---|--- --- ---|--- --- ---|
|--- --- --- --- --- ---|--- --- ---|--- --- ---|
|--- --- --- --- --- ---|--- --- ---|--- --- ---|
|--- --- --- --- --- ---|--- --- ---|--- --- ---|
          span-6           span-3    span-3 last

There you go, you just created a 3 columns layout, with one large content
and two sidebars ! And if you want, you can modify it extremely fast by
just changing the class, like this :

|--- --- --- --- --- --- --- ---|--- ---|--- ---|
|--- --- --- --- --- --- --- ---|--- ---|--- ---|
|--- --- --- --- --- --- --- ---|--- ---|--- ---|
|--- --- --- --- --- --- --- ---|--- ---|--- ---|
|--- --- --- --- --- --- --- ---|--- ---|--- ---|
            span-8               span-2   span-2 last

or 

|--- --- --- ---|--- --- --- --- ---|--- --- ---|
|--- --- --- ---|--- --- --- --- ---|--- --- ---|
|--- --- --- ---|--- --- --- --- ---|--- --- ---|
|--- --- --- ---|--- --- --- --- ---|--- --- ---|
|--- --- --- ---|--- --- --- --- ---|--- --- ---|
     span-4            span-5        span-3 last

Even better, you can use the class to add some padding inside your columns.
By using the class 'prefix' and suffix', bring some air to your layout :

|    --- --- --- --- ---    |    --- --- ---    |
|    --- --- --- --- ---    |    --- --- ---    |
|    --- --- --- --- ---    |    --- --- ---    |
|    --- --- --- --- ---    |    --- --- ---    |
|    --- --- --- --- ---    |    --- --- ---    |
  span-5 prefix-1 suffix-1    span-3 prefix-1 suffix-1 last
  
or why not :

|    --- --- --- --- --- ---        |--- --- ---|
|    --- --- --- --- --- ---        |--- --- ---|
|    --- --- --- --- --- ---        |--- --- ---|
|    --- --- --- --- --- ---        |--- --- ---|
|    --- --- --- --- --- ---        |--- --- ---|
    span-5 prefix-1 suffix-2         span-3 last

by using more columns, you can have more control over the spacing. for example,
with 24 columns :

|-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --|
|-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --|
|-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --|
|-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --|

You could have something like this :

|   -- --   |      -- -- -- -- -- -- -- -- -- -- -- --      |   -- --   |
|   -- --   |      -- -- -- -- -- -- -- -- -- -- -- --      |   -- --   |
|   -- --   |      -- -- -- -- -- -- -- -- -- -- -- --      |   -- --   |
|   -- --   |      -- -- -- -- -- -- -- -- -- -- -- --      |   -- --   |
|   -- --   |      -- -- -- -- -- -- -- -- -- -- -- --      |   -- --   |
|   -- --   |      -- -- -- -- -- -- -- -- -- -- -- --      |   -- --   |
span-2                 span-12 prefix-2 suffix-2             span-2  
prefix-1                                                     prefix-1
suffix-1                                                     suffix-1 last

You will notice that when you add all the used columns, prefix and suffix, it
should always be equal to the total of columns of the page.

If you wish to have a DIV that takes the entire width of the page, you can
either user the span class, like span-12, for 12 columns, or span-24 for 24
columns, but you can also use the class span-full.

|-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --|
|-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --|
                            span-full
                            
You will not need to add the 'last' class to the span-full.


What is different in the Grid system?
--------------------------------------------------------

The FLUID GRID SYSTEM does not use pixels like the other grid systems, but
instead, uses percentages. This is why you can change the width of the page
and it won't interfere with the column set up, or even use the grids on a 
fluid layout.