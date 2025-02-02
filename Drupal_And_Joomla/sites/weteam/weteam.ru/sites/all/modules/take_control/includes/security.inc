<?php
// $Id:

function take_control_security_error($msg = 'You are not authorized to perform this action.') {
  die($msg);
}

function take_control_encrypt_data($data) {
  //  $pubkey = variable_get('take_control_public_key', '');
  //  $success = openssl_seal($data, $sealed, $envkey, array($pubkey));
  //  return (array('encrypted' => $sealed, 'envkey' => $envkey));
  $privkey = variable_get('take_control_private_key', '');
  $passphrase = variable_get('take_control_pass_phrase', '');
  $privkey = openssl_pkey_get_private($privkey, $passphrase);
  openssl_private_encrypt($data, $crypted, $privkey);

  openssl_pkey_free($privkey);

  return (base64_encode($crypted));
}

function take_control_decrypt_data($encrypted, $pubkey = NULL) {
  //  $prikey = variable_get('take_control_private_key', '');
  //  $passphrase = variable_get('take_control_pass_phrase', '');
  //  $prikey = openssl_pkey_get_private($prikey, $passphrase);
  //  $success = openssl_open($encrypted, $decrypted, $envkey, $prikey);
  if (is_null($pubkey)) {
    $pubkey = variable_get('take_control_public_key', '');
  }
  openssl_public_decrypt(base64_decode($encrypted), $decrypted, $pubkey);
  return ($decrypted);
}

function take_control_new_keys($algo, $passphrase) {
  $keys = array();

  $configargs = array(
      'digest_alg' => $algo,
      'config' => drupal_get_path('module', 'take_control') . '/openssl.cnf');

  // Create the keypair
  $res = openssl_pkey_new($configargs);

  // Get private key. A pass phrase is required for proper encryption/decryption.
  openssl_pkey_export($res, $privkey, $passphrase, $configargs);

  // Get public key
  $pubkey = openssl_pkey_get_details($res);
  $pubkey = $pubkey['key'];

  $keys['priv'] = $privkey;
  $keys['pub'] = $pubkey;

  openssl_free_key($res);

  return ($keys);
}
