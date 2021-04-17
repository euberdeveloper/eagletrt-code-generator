const path = require('path');
const glob = require('glob')
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const DtsBundleWebpack = require('dts-bundle-webpack');

const generatorsEntryFiles = glob
    .sync('./source/lib/generators/**/*.generator.ts')
    .reduce(
        (result, filePath) => ({ ...result, [path.basename(filePath, path.extname(filePath))]: filePath })
        , {});

const generatorsConfig = {
    target: 'node',
    mode: 'production',
    // devtool: 'source-map',
    entry: generatorsEntryFiles,
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'bundled', 'lib', 'generators'),
        filename: '[name].js',
        library: 'eagletrt-code-generator',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true
    }
};

const libConfig = {
    target: 'node',
    mode: 'production',
    // devtool: 'source-map',
    entry: {
        index: './source/lib/index.ts',
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new DtsBundleWebpack({
            name: 'eagletrt-code-generator',
            main: 'dist/source/lib/index.d.ts',
            out: '../../../bundled/lib/index.d.ts'
        }),
        new webpack.EnvironmentPlugin(['IS_WEBPACK'])
    ],
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'bundled', 'lib'),
        filename: 'index.js',
        library: 'eagletrt-code-generator',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    }
};

const binConfig = {
    target: 'node',
    mode: 'production',
    // devtool: 'source-map',
    entry: {
        index: './source/bin/index.ts',
    },
    plugins: [
        new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader'
                    },
                    {
                        loader: 'shebang-loader'
                    }
                ]
            }
        ]
    },
    externals: [{
        '../lib/index': {
            amd: '../lib/index.js',
            root: 'eagletrt-code-generator',
            commonjs: '../lib/index.js',
            commonjs2: '../lib/index.js'
        }
    }, nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'bundled', 'bin'),
        filename: 'index.js',
        library: 'eagletrt-code-generator',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    }
};

module.exports = [
    generatorsConfig,
    libConfig,
    binConfig
];