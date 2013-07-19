$("head").append('<link rel="stylesheet" href="/assets/js/fancybox/jquery.fancybox.css?v=2.1.4" type="text/css" />');
$("head").append('<link rel="stylesheet" href="/assets/js/fancybox/helpers/jquery.fancybox-buttons.css?v=1.0.5" type="text/css" />');

$("head").append('<script type="text/javascript" src="/assets/js/fancybox/jquery.fancybox.pack.js?v=2.1.4"></script>');
$("head").append('<script type="text/javascript" src="/assets/js/fancybox/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script>');

$(".post-image").fancybox({
	prevEffect		: 'none',
	nextEffect		: 'none',
	closeBtn		: true,
	helpers		: {
		title	: { type : 'inside' },
		buttons	: {}
	}
});