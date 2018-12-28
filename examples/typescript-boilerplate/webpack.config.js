var webpack = require( 'webpack' ),
    path = require( 'path' );

module.exports = {
    entry  : {
        app : './src/index.tsx'
    },

    output : {
        // export itself to a global var
        path       : __dirname + '/dist',
        publicPath : '/dist/',
        filename   : '[name].js'
    },

    devtool : 'source-map',

    resolve : {
        modules : [ 'node_modules', 'src' ]
    },

    module : {
        rules : [
            {
                test : /\.css$/,
                use : [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test    : /\.tsx?$/,
                exclude : /(node_modules|lib)/,
                loader  : 'awesome-ts-loader'
            },
            {
                test: /\.ts$/,
                use: ["source-map-loader"],
                enforce: "pre"
            }
        ]
    }
};