<?php
/*
 * filesave.php
 * To be used with ext-server_opensave.js for SVG-edit
 *
 * Licensed under the Apache License, Version 2
 *
 * Copyright(c) 2010 Alexis Deveria
 *
 */
 
if(!isset($_POST['output_svg']) && !isset($_POST['output_png'])) {
  die('post fail');
}

$file = '';

$suffix = isset($_POST['output_svg'])?'.svg':'.png';

if(isset($_POST['filename']) && strlen($_POST['filename']) > 0) {
  $file = $_POST['filename'] . $suffix;
} else {
  $file = 'image' . $suffix;
}

if($suffix == '.svg') {
  $mime = 'image/svg+xml';
  $contents = rawurldecode($_POST['output_svg']);
} else {
  $mime = 'image/png';
  $contents = $_POST['output_png'];
  $pos = (strpos($contents, 'base64,') + 7);
  $contents = base64_decode(substr($contents, $pos));
}

// commented out to enable save to server
// header("Cache-Control: public");
// header("Content-Description: File Transfer");
// header("Content-Disposition: attachment; filename=" . $file);
// header("Content-Type: " .  $mime);
// header("Content-Transfer-Encoding: binary");
 
// echo $contents;
 
// added for save to server, see - http://binoyav.blogspot.com.au/2011/11/svg-edit-saving-files-to-server.html
define('DIR_PATH', '/var/svg_save/');
$fp = fopen(DIR_PATH . $file, 'w+');
fwrite($fp, $contents);
fclose($fp);
?>
