������ � ���������� ����� �������, �� ���������� �������� �� ���������, ��� ��� ����� ����, �� ������ �� ������ ������ ���� ������ �� ������ �� 100% �����.

����, � ���������� �� ������� ������: 

1.��� �������� ����� ����: "sites/default/files/imagepicker/others/����������" ���� ����� ����������� ��������, � ��� ��������� ���������
2.��� ����������� ����� � ������� ������, ���������� ��� � ���� ��������� ������ �� ����� ������� �� �������� ���������, � � ����� ������� ���� ���������� � �������� ��������
������� ���� �����:

1.��������� ����� ��� ������ �� �� ������ �� ���������, � �� �� uid'��. ��� ������������ ������ ������� ��� �� �������� � ���� �������, �� ���� ��� ��� ����� �������� �� ������������, ��������� ���� ���� � ���������. � �������� ����� ������������ �����-������ ������ ���������� ���� �����, ����� ����������� �������.
2.��� �������� ������ ������� �� ������� ����� � ����������� ��� ���� �����������������������������, � ���� �� ���� ������� �������, ������ ���������� ��� ������ ���������, ��� ��������� �� ������� ������������ ��������� ��� �������� ���������, ��� ��� �������� ������� �� ���������. 
����������:

1.������ "imagepicker.module" ������ �����: v 1.21 2009/03/07 11:02:47, ������� "imagepicker_get_path", ������ (�� ������ �����) 428:
������ �: 
$username = !is_array($userdir) ? $user->name : $userdir['name'];��: 

$username = !is_array($userdir) ? $user->uid : $userdir['uid'];(��� ��� � ����� ��� ������������ ����� ����� ������ ����)

2.������ "imagepicker.upload.inc" ������ �����: v 1.3 2008/08/28 21:25:20, ������� "imagepicker_get_uploaded_file_name" ����� ������� ������ �:

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
}��:

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
}��� ����� � ������ ����������� ������������ ������� ������������ ����� �����, � ������� ������� ��� ��� ����������� �� ������� ����+�����.

