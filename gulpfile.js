const { task, src, watch, parallel } = require('gulp'),

  browserSync = require('browser-sync');



task('reload', () => {

  return src('src/**/*').pipe(browserSync.reload({ stream: true }));

});



task('start', () => {

  browserSync({

    server: {

      baseDir: 'src',

    },

    notify: false,

  });

});



task('watch', () => {

  watch('src/**/*', parallel('reload'));

});



task('default', parallel('start', 'watch'));

