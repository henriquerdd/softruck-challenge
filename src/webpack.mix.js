const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js');

mix.react('resources/js/components/tasks/tasksList.js', 'public/js/components/tasks/');
mix.react('resources/js/components/tasks/tasksCreate.js', 'public/js/components/tasks/');
mix.react('resources/js/components/tasks/tasksUpdate.js', 'public/js/components/tasks/');