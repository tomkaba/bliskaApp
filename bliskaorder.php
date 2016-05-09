<?php
 header('Access-Control-Allow-Origin: *'); 
 header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept'); 

 $order=$_REQUEST['order'];
 
 $order=str_replace("\\\"","\"",$order);	
 $order=json_decode($order);

 $to = "tomek.kabarowski@gmail.com";
 $subject = "Nowy wniosek BLISKAPOZYCZKA.PL";
 $txt = print_r($order,1);
 $headers = "From: auto@bliskapozyczka.pl" . "\r\n" .
		"CC: tomek.kabarowski@gmail.com";

 
 mail($to,$subject,$txt,$headers);

 
 echo '1';
?>