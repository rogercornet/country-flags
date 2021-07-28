const fs = require(`fs-extra`)
const gulp = require(`gulp`)
const { paths } = require(`./package.json`)
const svgSprite = require(`gulp-svg-sprite`)

gulp.task(`svgflags`, () => {
  const config = {
    dest: `./dest`,
    mode: {
      defs: true
    }
  }

  return gulp.src(`${paths.svgNogradient}/*.svg`)
    .pipe(svgSprite(config))
    .on(`error`, (error) => {
      log.info(error)
    })
    .pipe(gulp.dest(`./dest`))
})
