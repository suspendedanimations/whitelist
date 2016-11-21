<?php
$context = Timber::get_context();
$context['work'] = new TimberPost();
$context['prev'] = get_previous_post();
$context['next'] = get_next_post();

Timber::render('views/single/single.twig', $context);