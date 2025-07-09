import gulp from 'gulp';
const { src, dest, watch, series, parallel } = gulp;

import sass from 'gulp-sass';
import dartSass from 'sass';
const sassCompiler = sass(dartSass);

import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import browserSyncLib from 'browser-sync';
const browserSync = browserSyncLib.create();
import { rm } from 'fs/promises';

import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';

const paths = {
  html: 'src/*.html',
  styles: 'src/scss/**/*.scss',
  scripts: 'src/js/**/*.js',
  images: 'src/assets/img/**/*',
  // fonts: 'src/assets/fonts/**/*'
};

export async function clean() {
  await rm('dist', { recursive: true, force: true });
}

export function html() {
  return src(paths.html)
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

export function styles() {
  return src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

export function scripts() {
  return src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

export function images() {
  return src(paths.images)
    .pipe(dest('dist/assets/img'));
}

// export function fonts() {
//   return src(paths.fonts)
//     .pipe(dest('dist/assets/fonts'));
// }

export function serve() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    notify: false
  });

  watch(paths.html, html);
  watch(paths.styles, styles);
  watch(paths.scripts, scripts);
  watch(paths.images, images);
  // watch(paths.fonts, fonts);
}

export default series(
  clean,
  parallel(html, styles, scripts, images),
  serve
);
