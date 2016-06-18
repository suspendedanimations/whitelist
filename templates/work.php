<?php
/**
 * Template Name: Work Template
 */

$context = Timber::get_context();

$context['normal'] = Timber::get_posts(array('post_type' => 'work', 'category_name' => 'normal', 'posts_per_page' => -1, 'order_by' => 'date'));
$context['music'] = Timber::get_posts(array('post_type' => 'work', 'category_name' => 'music', 'posts_per_page' => -1, 'order_by' => 'date'));

Timber::render('views/work/work.twig', $context);