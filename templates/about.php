<?php
/**
 * Template Name: About Template
 */

$context = Timber::get_context();

// $args = array('post_type' => 'work', 'order_by' => 'date');
// $context['works'] = Timber::get_posts($args);

Timber::render('views/about/about.twig', $context);