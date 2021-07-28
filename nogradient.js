const fs = require(`fs-extra`)
const jsdom = require(`jsdom`);
const { paths } = require(`./package.json`)

fs.removeSync(paths.svgNogradient)

fs.copySync(paths.svgSource, paths.svgNogradient)

fs.readdirSync(paths.svgNogradient).forEach((filename) => {
  const fileHTMLString = fs.readFileSync(`${paths.svgNogradient}/${filename}`).toString();
  const dom = new jsdom.JSDOM(fileHTMLString);
  const doc = dom.window.document
  const gradients = {}
  const linearGradients = doc.querySelectorAll(`linearGradient`)

  // Create a map with the gradients and their fallback color
  linearGradients.forEach((linearGradient) => {
    const id = linearGradient.getAttribute(`id`)
    const color = linearGradient.querySelector(`stop:last-of-type`).getAttribute(`stop-color`)

    gradients[id] = color

    linearGradient.remove()
  })

  Object.keys(gradients).forEach((gradientkey) => {
    const rects = doc.querySelectorAll(`[fill="url(#${gradientkey})"]`)

    rects.forEach((rect) => {
      rect.removeAttribute(`fill`)
      rect.setAttribute(`fill`, gradients[gradientkey])
    })
  })

  const transformed = doc.body.innerHTML

  fs.writeFileSync(`${paths.svgNogradient}/${filename}`, ``)
  fs.writeFileSync(`${paths.svgNogradient}/${filename}`, transformed)
});
