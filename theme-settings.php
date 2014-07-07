<?php
function sonambulo_form_system_theme_settings_alter(&$form, &$form_state) {

  $form['libraries'] = array(
    '#type'  => 'fieldset',
    '#title' => t('Additional Libraries'),
  );
  $form['libraries']['html5shim'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('html5 Shim'),
    '#default_value' => theme_get_setting('html5shim'),
    '#description'   => t('Adds the html5 shim, a library that enables non-modern browsers to recognize HTML5 elements.')
  );
  $form['libraries']['respond_js'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Respond'),
    '#default_value' => theme_get_setting('respond_js'),
    '#description'   => t('respond.js: A fast & lightweight polyfill for min/max-width CSS3 Media Queries (JavaScript library for IE 6-8, and more).')
  );
  $form['libraries']['normalize_css'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('normalize.css'),
    '#default_value' => theme_get_setting('normalize_css'),
    '#description'   => t('A modern, HTML5-ready alternative to CSS resets.')
  );

}
