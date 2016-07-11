<?php
/**
 * Template Name: Home Template
 */

$context = Timber::get_context();
$context['page'] = new TimberPost();

Timber::render('views/home/home.twig', $context);