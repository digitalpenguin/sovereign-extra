<?php
include 'functions.php';
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link type="text/css" rel="stylesheet" href="pagination.css" />
<script id="moo" src="jquery-1.4.2.min.js" type="text/javascript"></script>
<script id="pagination" src="pagination-jq.js" type="text/javascript"></script>
<script>
$(document).ready(function() {
  new Paginator('http://local.dev.com.au/pagination/ajax.php');
});

</script>
<title>Simons Easy Ajax Pagination</title>
</head>
<body>

	
	<h1>Simons Easy Ajax Pagination (jQuery)</h1>
    
    
    <!-- Begin Pagination code -->
	<div id="pagination_controls">
        <div id="pagination_control_wrapper">
        </div>
    </div>    
	<div id="pagination_container">
       <div id="pagination_content_wrapper">
       </div>
    </div>
    <!-- End Pagination code -->
    
    
    <div class="points">
        <!-- Features -->
        <strong>Features</strong>
        <ul>
            <li>Ajaxian Pagination</li>
            <li>Back &amp; Forward button support</li>
            <li>URL ajax navigation <a href="pagination_jquery.php#p=4">Go To page 4</a></li>
            <li>JavaScript ajax navigation whithin class "this.pLoad('3');" loads page 3</li>
            <li>Left to Right, or Right to Left animated slide</li>
        </ul>
        
         <!-- To Do -->
        <strong>To Do</strong>
        <ul>
            <li>Cache with on/off switch</li>
        </ul>
    </div>
    
</body>
</html>