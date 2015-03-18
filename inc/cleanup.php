<?php
# Remove HOME from Yoast Breadcrumbs (http://wordpress.org/support/topic/how-can-i-remove-home-from-breadcrumbs)
/* add_filter('wpseo_breadcrumb_links', 'sleek_remove_home_from_breadcrumb');

function sleek_remove_home_from_breadcrumb ($links) {
	if ($links[0]['url'] == get_home_url()) {
		array_shift($links);
	}

	return $links;
} */

# Exclude AddThis widgets from anything other than posts
add_filter('addthis_post_exclude', 'sleek_addthis_post_exclude');

function sleek_addthis_post_exclude ($display) {
	if (!is_singular('post')) {
		$display = false;
	}

	return $display;
}

# Give pages excerpts
# add_action('init', 'sleek_add_excerpts_to_pages');

function sleek_add_excerpts_to_pages () {
	add_post_type_support('page', 'excerpt');
}

# Add some fields to users
# add_filter('user_contactmethods', 'sleek_add_user_fields');

function sleek_add_user_fields ($fields) {
	$fields['profession'] = __('Profession', 'sleek');

	return $fields;
}

# Allow HTML in Widget Titles (with [tags])
add_filter('widget_title', 'sleek_html_in_widget_titles');

function sleek_html_in_widget_titles ($title)
{
	$title = str_replace('[', '<', $title);
	$title = str_replace(']', '>', $title);
	$title = strip_tags($title, '<a><blink><br><span>');

	return $title;
}

# Cleanup HEAD
# From: http://www.themelab.com/2010/07/11/remove-code-wordpress-header/
add_action('init', 'sleek_cleanup');

function sleek_cleanup () {
	# Comment if needed
	## Really Simple Discovery
	remove_action('wp_head', 'rsd_link');

	## Windows Live Writer
	remove_action('wp_head', 'wlwmanifest_link');

	## Wordpress Generator
	remove_action('wp_head', 'wp_generator');

	## WPML Generator
#	remove_action('wp_head', array($sitepress, 'meta_generator_tag'));

	## Useless link elements
	remove_action('wp_head', 'start_post_rel_link');
	remove_action('wp_head', 'index_rel_link');
	remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');
}
