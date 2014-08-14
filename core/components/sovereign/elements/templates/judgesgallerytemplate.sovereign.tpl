<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>[[++site_name]] - [[*pagetitle]]</title>
<base href="[[++site_url]]" />
<link href="[[++assets_url]]theme/css/html5reset-1.6.1.css" rel="stylesheet" type="text/css" />
<link href="[[++assets_url]]theme/css/style.css" rel="stylesheet" type="text/css" />

<link href='http://fonts.googleapis.com/css?family=Muli:300,400,400italic,300italic' rel='stylesheet' type='text/css'>

<!--- fancybox --->
<link rel="stylesheet" type="text/css" href="[[++assets_url]]theme/fancybox/jquery.fancybox.css?v=2.1.5" media="screen" />

<!-- slider -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.0.0/animate.min.css">
<link rel="stylesheet" href="[[++assets_url]]theme/css/liquid-slider.css">

<!-- Rate It -->
<link rel="stylesheet" href="[[++assets_url]]theme/css/rateit.css">
</head>

<body class="no-js">

[[$header]]

[[$nav]]

<section id="slide">
    <img src="[[++assets_url]]theme/images/judge_banner.jpg" alt="Judges Gallery" /></div>
</section>

<!-- Judges Gallery block -->
<section class="judges_block">
    [[*content]]
</section>



[[$newsletter-signup]]

[[$footer]]

<script src="[[++assets_url]]theme/js/modernizr-latest.js" type="text/javascript"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>

<!--- fancybox --->
<script type="text/javascript" src="[[++assets_url]]theme/fancybox/jquery.fancybox.js?v=2.1.5"></script>
<!-- Add Media helper -->
<script type="text/javascript" src="[[++assets_url]]theme/fancybox/helpers/jquery.fancybox-media.js?v=1.0.6"></script>

<!--- slider --->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.4/jquery.touchSwipe.min.js"></script>
<script src="[[++assets_url]]theme/js/jquery.liquid-slider.min.js"></script>
 
<!--- sticky --->
<script type="text/javascript" src="[[++assets_url]]theme/js/jquery.sticky.js"></script>

<!--- smooth scroll --->
<script src="[[++assets_url]]theme/js/smooth-scroll.js"></script>

<!--- rate it --->
<script src="[[++assets_url]]theme/js/jquery.rateit.js"></script>

<!-- js call for action -->
<script src="[[++assets_url]]theme/js/script.js" type="text/javascript"></script>

<script>
    $(function() {

        $('.rateit').bind('rated', function(event, value) {
            var id = $(this).data('id');
            var galleryId = $(this).data('galleryId');
            $.post('[[~27]]', {artworkId:id, value:value, galleryId:galleryId})
                    .done(function(data){
                        console.log(data);
                    });

        });

        $('.rateit').bind('reset', function(event, value) {
            var id = $(this).data('id');
            var galleryId = $(this).data('galleryId');
            $.post('[[~27]]', {artworkId:id, value:value, galleryId:galleryId})
                    .done(function(data){
                        console.log(data);
                    });
        });
    });
</script>

</body>
</html>