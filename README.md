# Proof that PR works like a charm
This repo shows, that using the `module` entry in package.json doesn't have any negative impacts when using Next.js. It builds just fine, transforms ES6 to ES5 & runs in IE11 with absolutely no problems.

Website compiles perfectly to ES5, the only change i had to do was remove the `require('tslib');` line, and everything works perfectly.

nextjs-blog contains the starter tutorial of Next.js and browser folder contains the built @simplewebauthn/browser, and is imported using relative file import "npm install file:../browser"

