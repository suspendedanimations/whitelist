<?php
/**
 * Template Name: Contact Template
 */

$context = Timber::get_context();
$context['page'] = new TimberPost();

Timber::render('views/contact/contact.twig', $context);