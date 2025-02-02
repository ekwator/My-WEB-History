<?php
$url = "http://www.yoursite.euroauto.ru/index.php?login=&firms";
$parse_url = parse_url($url);
$path = $parse_url["path"]; // ���� �� ����� (/index.php)
if($parse_url["query"]) // ���� ���� ������ ����������
	$path .= "?" . $parse_url["query"]; // ��������� (?login=&firms)
$host= $parse_url["host"]; // ��� �������� ���� (yoursite.euroauto.ru)
$fp = fsockopen($host, 80, $errno, $errstr, 10);
$dom = new DomDocument();
// �������� ����� ���������
$dom->validateOnParse = true;
$dom->Load(fgets($fp));
//��������� xml
$dom->formatOutput = true; // ��������� �������� formatOutput
// domDocument � �������� true
// save XML as string or file
$test1 = $dom->saveXML(); // �������� ������ � test1
$dom->save('test1.xml'); // ���������� �����

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