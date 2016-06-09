<?php
require_once('d.php');

header('Content-type: text/plain');

		
	$link=mysql_connect(DB_HOST,DB_USER,DB_PASSWORD);
	mysql_select_db(DB_NAME);
	mysql_set_charset(DB_CHARSET);

	$res=mysql_query('select id,miasto,kod_pocztowy,ulica,numer from punkty');
	if($_GET['min']>0) 
	{
		$res.=' where id>='.intval($_GET['min']);
		if($_GET['max']>0) 
		$res.=' and id<='.intval($_GET['max']);
	}
	while($row=mysql_fetch_row($res)) {
	
		// Get lat and long by address         
        $address = sprintf('Polska %s %s ul. %s %s',$row[2],$row[1],$row[3],$row[4]);
		
		$prepAddr = str_replace(' ','+',$address);
        $geocode=file_get_contents('https://maps.google.com/maps/api/geocode/json?address='.$prepAddr.'&sensor=false');
        $output= json_decode($geocode);
        $latitude = $output->results[0]->geometry->location->lat;
        $longitude = $output->results[0]->geometry->location->lng;

		if($latitude>0 && $longitude>0)
		{
			$q=sprintf('update punkty set lat=%f,lon=%f where id=%d',$latitude,$longitude,$row[0]);
			mysql_query($q);
			echo $q."\r\n";
		}
		else
			echo $address." NOT FOUND\r\n";
			
		
	}

	mysql_close($link);
?>