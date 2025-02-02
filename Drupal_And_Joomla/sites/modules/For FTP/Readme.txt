¬общем с кириллицей нашел решение, на абсолютную верность не претендую, так как опыта мало, но теперь во вс€ком случае свою работу он делает на 100% верно.

»так, с кириллицей он кос€чил дважды: 

1.при создании папки типа: "sites/default/files/imagepicker/others/¬ас€ѕупкин" куда потом загружаетс€ картинка, и где создаютс€ превьюшки
2.при копировании файла с русским именем, получалось что в базу заноситс€ только та часть котора€ не содержит кириллицы, а в папку ложилс€ файл содержащий в названии каракули
–ешение было такое:

1.создавать папки дл€ юзеров не по именам их аккаунтов, а по их uid'ам. Ёто единственный момент который мне не нравитс€ в этом решении, не знаю как это может повли€ть на безопасность, поправьте мен€ если € накос€чил. ¬ принципе можно использовать какое-нибудь другое уникальное поле юзера, можно специальное завести.
2.при загрузки файлов убивать их текущие имена и присваивать им€ типа годћес€цƒень„асыћинуты—екунды, в этом не вижу никаких минусов, модуль показывает при выборе превьюшки, при наведении на которые отображаютс€ введенные при загрузке заголовки, так что путаницы никакой не возникнет. 
–еализаци€:

1.модуль "imagepicker.module" верси€ файла: v 1.21 2009/03/07 11:02:47, функци€ "imagepicker_get_path", строка (от начала файла) 428:
мен€ем с: 
$username = !is_array($userdir) ? $user->name : $userdir['name'];на: 

$username = !is_array($userdir) ? $user->uid : $userdir['uid'];(тут вот и видно что использовать можно любое другое поле)

2.модуль "imagepicker.upload.inc" верси€ файла: v 1.3 2008/08/28 21:25:20, функци€ "imagepicker_get_uploaded_file_name" текст функции мен€ем с:

function imagepicker_get_uploaded_file_name($destination, $name) {
  $fileext = imagepicker_get_uploaded_file_extension($name);

  if (FALSE !== strpos($_FILES['files']['name'][$name], '.')) {
    $filename = drupal_substr($_FILES['files']['name'][$name], 0, strrpos($_FILES['files']['name'][$name], '.'));
  }
  else {
    $filename = $_FILES['files']['name'][$name];
  }

  $file = $filename . $fileext;
  $i = 0;
  while (file_exists($destination . $file)) {
    $i++;
    $file = $filename .'_'. $i . $fileext;
  }
  return $file;
}на:

function imagepicker_get_uploaded_file_name($destination, $name) {
  $fileext = imagepicker_get_uploaded_file_extension($name);

  //if (FALSE !== strpos($_FILES['files']['name'][$name], '.')) {
  //  $filename = drupal_substr($_FILES['files']['name'][$name], 0, strrpos($_FILES['files']['name'][$name], '.'));
  //}
  //else {
  //  $filename = $_FILES['files']['name'][$name];
  //}
  $filename = date("YmdHis");
  
  $file = $filename . $fileext;
  $i = 0;
  while (file_exists($destination . $file)) {
    $i++;
    $file = $filename .'_'. $i . $fileext;
  }
  return $file;
} ак видно € просто закомментил предложенный вариант формировани€ имени файла, и вставил строчку где им€ формируетс€ из текущей даты+врем€.

