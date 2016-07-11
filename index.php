<?php

$context = Timber::get_context();

$context['branded'] = Timber::get_posts(array('post_type' => 'work', 'category_name' => 'branded', 'posts_per_page' => -1, 'order_by' => 'date'));
$context['music'] = Timber::get_posts(array('post_type' => 'work', 'category_name' => 'music', 'posts_per_page' => -1, 'order_by' => 'date'));

Timber::render('views/work/work.twig', $context);