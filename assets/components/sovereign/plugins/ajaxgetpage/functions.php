<?

function paginator($base_path, $cur_page, $total_items, $per_page=10, $footer_bar=true, $name=false) {
  $remainder = $total_items % $per_page;
  $total_pages = ($total_items - $remainder)/$per_page;
  if($remainder > 0) $total_pages += 1;

  $start_num = 1 + ($cur_page-1)*$per_page;
  $end_num = $start_num + $per_page - 1;
  if ($end_num > $total_items) $end_num = $total_items;

  $next_page = $cur_page + 1;
  $prev_page = $cur_page - 1;

  $start_page = $cur_page - 2;
  $end_page = $cur_page + 2;

  if($end_page > $total_pages) {
    $end_page = $total_pages;
    $start_page = $total_pages - 4;
  } 

  if($start_page < 1) {
    $start_page = 1;
    if ($total_pages >= 5) $end_page = 5;
    else $end_page = $total_pages;
  }
      
  $class = $footer_bar ? "footer_bar" : "summary_bar";

  $ret  = '<div class="bar clearfix ' . $class . '">';
  if(!$footer_bar) $ret .= '<div class="summary">Displaying ' . $name . ' ' . $start_num . ' - ' . $end_num . ' of ' . $total_items . '.</div>';

  if($total_pages > 1) {
    $ret .= '<ul class="pagerpro">';
    if($cur_page != 1) $ret .= '<li><a href="' . $base_path .  '1' . '" id="page_first">First</a></li><li><a href="' . $base_path .  $prev_page . '" id="page_prev">Prev</a>';
    for($i=$start_page;$i<=$end_page;$i++) {
      $ret .= '<li';
      if($i == $cur_page) $ret .= ' class="current"';
      $ret .= '>';
      $ret .= '<a href="' . $base_path .  $i . '" id="page_' . $i . '">' . $i . '</a></li>';
    }
    if ($cur_page != $total_pages) $ret .= '<li><a href="' . $base_path .  $next_page . '" id="page_next">Next</a></li><li><a href="' . $base_path .  $total_pages . '" id="page_last">Last</a></li>';
    $ret .= '</ul>';
  }

  $ret .= '</div>';

  return $ret;
}
//$paginationUrl = 'http://local.dev.com.au/pagination/ajax.php';

?>