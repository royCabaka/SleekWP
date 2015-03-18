<?php
# Proxy for AJAX requests
# add_action('wp_ajax_sleek_proxy', 'sleek_proxy');
# add_action('wp_ajax_nopriv_sleek_proxy', 'sleek_proxy');

function sleek_proxy () {
	$validURLs = array(
		'https://feeds.foursquare.com', 
		'http://www.google.com'
	);
	$valid = false;

	foreach ($validURLs as $validURL) {
		if (strpos($_REQUEST['url'], $validURL) === 0) {
			$valid = true;
		}
	}

	if (!$valid) {
		die('Invalid URL');
	}

	header('Content-type: application/xml');

	$handle = fopen($_REQUEST['url'], 'r');

	if ($handle) {
		while (!feof($handle)) {
			echo fgets($handle, 4096);
		}

		fclose($handle);
	}

	die;
}
