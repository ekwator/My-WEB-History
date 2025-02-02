<?php
$url = "http://www.yoursite.euroauto.ru/index.php?login=&firms";
$parse_url = parse_url($url);
$path = $parse_url["path"]; // путь до файла (/index.php)
if($parse_url["query"]) // если есть список параметров
	$path .= "?" . $parse_url["query"]; // добавляем (?login=&firms)
$host= $parse_url["host"]; // тут получаем хост (yoursite.euroauto.ru)
$fp = fsockopen($host, 80, $errno, $errstr, 10);
$dom = new DomDocument();
// документ нужно проверить
$dom->validateOnParse = true;
$dom->Load(fgets($fp));
//генерация xml
$dom->formatOutput = true; // установка атрибута formatOutput
// domDocument в значение true
// save XML as string or file
$test1 = $dom->saveXML(); // передача строки в test1
$dom->save('test1.xml'); // сохранение файла

$reader = new XMLReader();
$reader->open(fgets($fp));
while ($reader->read()) {
	switch ($reader->nodeType) {
		case (XMLREADER::ELEMENT):
			if ($reader->localName == "firms") {
				if ($reader->getAttribute("firm") == 5225) {
					$node = $reader->expand();
					$dom = new DomDocument();
					$n = $dom->importNode($node,true);
					$dom->appendChild($n);
					$xp = new DomXpath($dom);
					$res = $xp->query("/entry/title");
					echo $res->item(0)->nodeValue;
				}
			}
	}
}