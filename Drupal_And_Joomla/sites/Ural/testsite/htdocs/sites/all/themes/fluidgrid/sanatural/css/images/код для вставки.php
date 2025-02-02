<?php 
drupal_add_js ('node/portfolio/js/jquery.lightbox.js');
drupal_add_css ('node/portfolio/lightbox.css');
?>

<ul id="gallery">
  <li><a rel="lightbox-tour" href="portfolio/img/1/01.jpg" title="Деревья">
  <img src="portfolio/img/1/01m.jpg" alt="" /></a></li>
  <li><a rel="lightbox-tour" href="portfolio/img/1/02.jpg" title="Дети">
  <img src="portfolio/img/1/02m.jpg" alt="" /></a></li>
  <li><a rel="lightbox-tour" href="portfolio/img/1/03.jpg" title="Фламинго">
  <img src="portfolio/img/1/03m.jpg" alt="" /></a></li>
  <li><a rel="lightbox-tour" href="portfolio/img/1/04.jpg" title="Руины">
  <img src="portfolio/img/1/04m.jpg" alt="" /></a></li><br>
  <li><a rel="lightbox-tour" href="portfolio/img/1/05.jpg" title="Собака">
  <img src="portfolio/img/1/05m.jpg" alt="" /></a></li>
  <li><a rel="lightbox-tour" href="portfolio/img/1/06.jpg" title="На рассвет">
  <img src="portfolio/img/1/06m.jpg" alt="" /></a></li>
  <li><a rel="lightbox-tour" href="portfolio/img/1/07.jpg" title="Тропинка в овраг.">
  <img src="portfolio/img/1/07m.jpg" alt="" /></a></li>
</ul>

<ul id="gallery">
  <li><a rel="lightbox-tour" href="portfolio/img/2/08.jpg" title="Грибочки">
  <img src="portfolio/img/2/08m.jpg" alt="" /></a></li>
</ul>

<script type="text/javascript">
$(document).ready(function(){
	$("#gallery a").lightbox();
	$.Lightbox.construct({
    	"speed": 500,
    	"show_linkback": true,
    	"keys": {
			close:	"q",
			prev:	"z",
			next:	"x"
		},
		"opacity": 0.3,
		text: {
		image:		"картинка",
		of:		"из",
		close:		"Закрыть",
		closeInfo:	"Завершить просмотр можно, кликнув мышью вне картинки.",
		help: {
			close:		"Закрыть",
				interact:	"Интерактивная подсказка"
			},
			about: {
				text: 	"Здесь может быть ссылка.",
				title:	"Корментарий к сылке...",
				link:	"http:/testsite/"
			}
		},
		files: {
			images: {
				prev:		"portfolio/img/prev.gif",
				next:		"portfolio/img/next.gif",
				blank:		"portfolio/img/blank.gif",
				loading:		"portfolio/img/loading.gif"
			}
		}
    });
});
</script>
