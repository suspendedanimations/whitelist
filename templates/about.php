<?php
/**
 * Template Name: About Template
 */

$context = Timber::get_context();
$context['page'] = new TimberPost();

Timber::render('views/about/about.twig', $context);