<?php 
include 'functions.php';

// Pagination params
$basePath		= 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['PHP_SELF'];
$qString		= $_REQUEST['qString'];
$items 			= $_REQUEST['items'];
$loadPage 		= $_REQUEST['p'];
$current 		= $_REQUEST['current'];

// This would be the max items returned from a query, I'm faking it here to represent a data set.
$maxItems		= 60;

// New pagination
$pagination = paginator($basePath . $qString, $loadPage, $maxItems, $items);

// Direction is important for the script to determine which way to animate, left or right. 
$direction = 'left';
if ($current < $loadPage) {
	$direction = 'right';
}
$max = $loadPage*$items;
$min = ($max-$items)+1;
$paginatedStyle = 'style="left:'.($direction == 'left' ? '-750px' : '750px').';"';


// The paginated content HTML slide
$page = '<div class="paginated" id="" '.$paginatedStyle.'>';

	/* Add you pagination content here! */
	$page .= '<ul>';
	while ($min <= $max) {
		$page .= '<li>'.$min.'</li>';
		$min++;
	}
	$page .= '</ul>';
	/* end paginated content */
	
$page .= '</div>';


// return the JSON
echo json_encode(array( 'pagination' => $pagination, 'page' => $page, 'current' => $loadPage ));
exit;

?>