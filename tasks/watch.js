
import gulp from 'gulp';

export default () =>
  
  gulp
    .watch(
      ['./lib/**/*.js', './test/**/*.js'],
      ['lint', 'test', 'browserify', 'browserify-test', 'compress', 'live-reload']);