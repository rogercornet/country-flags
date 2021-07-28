# country-flags
SVG files with Country Flags

## Source of svg
Most of the flags are taken from [FlagKit 2.0](https://github.com/madebybowtie/FlagKit), except for AG, AQ, BQ, EH countries, which are from [flag-icon-css](https://github.com/lipis/flag-icon-css/tree/master/flags/4x3).

## Rationale
Chromium browsers have problems to render `linearGradients` as the attribute `fill` for svg elements when those are within a sprite.
<br>
With `nogradient.js` function, the iconset is duplicated and the `<linearGradient>` elements are removed and the color used in the gradient is placed directly in the `fill` attribute for those elements where `fill="url(#linearGradient-id)"` were defined.

## How to use it


Execute `build:svg` which does the magic by creating a new set of icons from `SVG` folder and generates the sprite from that set:
```
$ npm run build:svg
```

Get the sprite from `./dest/defs/svg/sprite.defs.svg` and it's ready to use in your application.
