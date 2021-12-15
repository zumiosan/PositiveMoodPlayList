import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";

module.exports = {
    //設定
    mode: 'production',

    //エントリーポイント
    entry: './src/index.tsx',

    // jsファイルの出力先
    output: {
        path: path.resolve(__dirname, '../static/playlist/js'),
        filename: 'bundle.js',
        // assetModuleFilename: 'asset/[name][ext]'
    },

    // importで読み込むファイルの種類
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx']
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node-modules/,
                use: 'ts-loader',
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};