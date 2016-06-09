<?php

error_reporting(E_ERROR);
require_once('utils/d.php');
$link=mysql_connect(DB_HOST,DB_USER,DB_PASSWORD);
mysql_select_db(DB_NAME);
mysql_set_charset(DB_CHARSET);

$pts=array();

if(!isset($_GET['p']) || !$_GET['p'])
{
	$res=mysql_query('select id,nazwa,miasto,kod_pocztowy,ulica,numer,lat,lon,telefon,otw_robocze,zam_robocze,otw_swieto,zam_swieto,max_pozyczka,czas_kontaktu,tylko_online from punkty where lat>0 and lon>0');
	while($row=mysql_fetch_assoc($res)) {

		$pts[]=array(
			'id' => $row['id'],
			'name' => $row['nazwa'],
			'type' => 'point',
			'priority' => intval($row['tylko_online'])+1,
			'city' => $row['miasto'],
			'address' => 'ul. '.$row['ulica'].' '.$row['numer'],
			'tel' => $row['telefon'],
			'lat' => $row['lat'],
			'lon' => $row['lon'],
			'open' => intval($row['otw_robocze']).':00 - '.intval($row['zam_robocze']).':00',
			'maxloan' => $row['max_pozyczka'],
			'waittime' => $row['czas_kontaktu']
		);

	}

	echo json_encode($pts);
}
else
{
	$res=mysql_query('select * from punkty where id='.intval($_GET['p']));
	$row=mysql_fetch_assoc($res);
	echo json_encode($row);
}
mysql_close($link);
?>

