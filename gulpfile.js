const { src, dest, series, watch } = require(`gulp`),
    htmlValidator = require(`gulp-html`),
    CSSLinter = require(`gulp-stylelint`),
    babel = require(`gulp-babel`),
    htmlCompressor = require(`gulp-htmlmin`),
    jsCompressor = require(`gulp-uglify`),
    jsLinter = require(`gulp-eslint`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;


let browserChoice = `default`;


let validateHTML = () => {
    return src(`index.html`)
        .pipe(htmlValidator());
};


let lintJS = () => {
    return src(`js/app.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let compressHTML = () => {
    return src([`index.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};


let transpileJSForDev = () => {
    return src(`js/app.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};

let lintCSS = () => {
    return src(`css/styles.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

let transpileJSForProd = () => {
    return src(`js/app.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};


let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 25, // A delay is sometimes helpful when reloading at the
        server: {       // end of a series of tasks.
            baseDir: [
                `index.html`
            ]
        }
    });

    watch(`index.html`).on(`change`, reload);
};

exports.serve = serve;
exports.validateHTML = validateHTML;
exports.lintCSS = lintCSS;
exports.lintJS = lintJS;
exports.transpileJSForDev = transpileJSForDev;
exports.compressHTML = compressHTML;
exports.transpileJSForProd = transpileJSForProd;
