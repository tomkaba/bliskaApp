<?php
 header('Access-Control-Allow-Origin: *'); 
 header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept'); 

//error_reporting(E_ERROR);
require_once('utils/d.php');
$link=mysql_connect(DB_HOST,DB_USER,DB_PASSWORD);
mysql_select_db(DB_NAME);
mysql_set_charset(DB_CHARSET);

 $order=$_REQUEST['order'];
 
 $order=str_replace("\\\"","\"",$order);	
 $order=json_decode($order);

	
$q=sprintf('insert into wnioski values(0,"%s","%s","%s","%s","%s","%s",%d,%d,CURRENT_TIMESTAMP,1)',mysql_real_escape_string($order->vorname),mysql_real_escape_string($order->name),mysql_real_escape_string($order->email),mysql_real_escape_string($order->phone),mysql_real_escape_string($order->dowod),mysql_real_escape_string($order->pesel),intval($order->loanvalue),intval($order->punkt));
 mysql_query($q);
 
 	
 $to = "tomkowicz.rafal@gmail.com";
 $subject = "Nowy wniosek BLISKAPOZYCZKA.PL";
 $txt = print_r($order,1).'Q:'.$q;
 $headers = "From: auto@bliskapozyczka.pl" . "\r\n" .
		"CC: tomek.kabarowski@gmail.com";

 
 mail($to,$subject,$txt,$headers);

 
 echo '1';
?>