<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept'); 
 
//error_reporting(E_ERROR);
require_once('utils/d.php');
$link=mysql_connect(DB_HOST,DB_USER,DB_PASSWORD);
mysql_select_db(DB_NAME);
mysql_set_charset(DB_CHARSET);

$pts=array();


	$res=mysql_query('select wnioski.*,punkty.miasto as miasto from wnioski left join punkty on wnioski.punkt=punkty.id order by status,czas');
	while($row=mysql_fetch_assoc($res)) {

		$pts[]=array(
			'id' => $row['id'],
			'name' => $row['imie'].' '.$row['nazwisko'],
			'pesel' => $row['pesel'],
			'time' => $row['czas'],
			'loanvalue' => $row['loanvalue'],
			'pointID' => $row['punkt'],
			'city' => $row['miasto'],
			'status' => $row['status']
		);

	}

	echo json_encode($pts);


mysql_close($link);
?>



