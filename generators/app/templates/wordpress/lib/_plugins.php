<?php
/* =======================================
 * Plugins
 * ======================================= */

include_once (ABSPATH . 'wp-admin/includes/plugin.php');

/**
 * This ensures that Timber is loaded and available as a PHP class
 */
if (class_exists('Timber\Timber')) {
    $timber = new \Timber\Timber();
} else {
	add_action('admin_notices', function() {
            echo '<div class="error"><p>Timber not activated. Make sure you
            have installed composer dependencies.</p></div>';
		}
    );
}

/**
 * Notify about Advanced Custom Fields
 */
if (!class_exists('ACF')) {
    add_action('admin_notices', function() {
        echo '<div class="error"><p>Advanced custom fields not activated. Make sure you activate
        the plugins in <a href="' . esc_url(admin_url('plugins.php')) . '">' .
        esc_url(admin_url('plugins.php')) . '</a></p></div>';
    });
}

/**
 * Simple History: Reduce visibility
 */
add_filter('simple_history/view_history_capability', function($cap) {
    $cap = 'manage_options';
    return $cap;
});<% if (pluginWPML) { %>

/**
 * WPML: Remove metas and unneeded assets
 */
if (!empty($GLOBALS['sitepress'])) {
    add_action('wp_head', function() {
        remove_action(
            current_filter(),
            array ($GLOBALS['sitepress'], 'meta_generator_tag')
        );
    }, 0);

    define('ICL_DONT_LOAD_NAVIGATION_CSS', true);
    define('ICL_DONT_LOAD_LANGUAGE_SELECTOR_CSS', true);
    define('ICL_DONT_LOAD_LANGUAGES_JS', true);
}<% } %>
