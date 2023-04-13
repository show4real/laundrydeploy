// webpack.mix.js

const mix = require("laravel-mix");

mix.js("resources/js/app.js", "public/js")
    .styles(
        [
            "node_modules/antd/dist/reset.css",
            "node_modules/owl.carousel/dist/assets/owl.theme.default.css",
            "node_modules/owl.carousel/dist/assets/owl.carousel.css",
        ],
        "public/css/app.css"
    )
    .react()
    .postCss("resources/css/app.css", "public/css", [
        //
    ]);
