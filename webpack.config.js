import htmlWebpackPlugin from 'html-webpack-plugin';
import liveReloadPlugin from 'webpack-livereload-plugin';

export default {
    mode: 'development',
    entry: './app/index.js',
    output: {
        path: '/',
        filename: 'bundle.js'
    },

    module:{
        rules: [ 
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            },

            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },

                    {
                        loader: 'css-loader', options: {
                            sourceMap: true
                        }
                    },

                    {
                        loader: 'sass-loader', options: {
                            sourceMap: true
                        }
                    }
                ]
            }   
        ]
    },

    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        }),

        new liveReloadPlugin()
    ]
}