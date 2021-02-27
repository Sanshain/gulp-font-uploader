
# gulp-font-uploader

Плагин для автоматического скачивания шрифтов и автозамены ссылок с полных ссылок на сторонние ресурсы на относительные внутренние так, что разработчику (верстальщику) не стоит тратить на это время и внимание

Чем-то похож на `gulp-google-webfonts`. Но последний почему-то не заработал, и этой стало причиной появления на свет `gulp-font-uploader`.

Прежде всего я делал упор на интерграцию с `gulp-less`. Простейшее использование выглядит так:

```js
gulp.task('less', function () {  

  return gulp.src('./style/**/*.less')
    .pipe(cache('less', {
      optimizeMemory: true
    }))
    .pipe(sourcemaps.init())
    .pipe(less({}))    
    .pipe(fontGetter({static_url: '/static/'}))    
    .pipe(sourcemaps.write())  
    .pipe(gulp.dest('./style'));
});
```

Смысл скрипта прост: cсылки в css/less вида

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital@1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
```

он конвертирует в 

```css
@font-face {
  font-family: 'Cormorant Infant';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(/static/fonts/HhyJU44g9vKiM1sORYSiWeAsLN997_IV3A.ttf) format('truetype');
}
@font-face {
  font-family: 'Lobster';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/static/fonts/neILzCirqoswsqX9_oU.ttf) format('truetype');
}
```

При этом автоматически скачивая и складывая шрифты в директорию `fonts` внутри корневой директории 
