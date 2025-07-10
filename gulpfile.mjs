import gulp from 'gulp';
const { src, dest, watch, series, parallel } = gulp;
import gulpPug from 'gulp-pug';

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

import rename from 'gulp-rename';

const paths = {
  pug: {
    src: 'src/pug/**/*.pug',
    dest: 'dist/',
  },
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/',
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/',
  },
  images: {
    src: 'src/assets/img/**/*.{jpg,jpeg,png,svg,gif,webp}',
    dest: 'dist/assets/img/',
  },
  fonts: {
    src: 'src/assets/fonts/**/*.{woff,woff2}',
    dest: 'dist/assets/fonts/',
  },
};

export async function clean() {
  await rm('dist', { recursive: true, force: true });
}

export function templates() {
  return src(paths.pug.src)
    .pipe(gulpPug({ pretty: true }))
    .pipe(dest(paths.pug.dest));
}

export function styles() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

export function scripts() {
  return src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

export function images() {
  return src(paths.images.src, { encoding: false })
    .pipe(dest(paths.images.dest));
}

export function fonts() {
  return src(paths.fonts.src)
    .pipe(dest(paths.fonts.dest));
}

export function serve() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    notify: false,
    port: 3000,
  });

  watch(paths.pug.src, series(templates)).on('change', browserSync.reload);
  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, series(images)).on('change', browserSync.reload);
  watch(paths.fonts.src, series(fonts)).on('change', browserSync.reload);
}

export const build = series(
  clean,
  parallel(templates, styles, scripts, images, fonts)
);

export default series(
  build,
  serve
);
