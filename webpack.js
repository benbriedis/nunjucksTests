const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
    return {
    	mode: 'development',
        entry: {
            browserTester: './src/BrowserTester.ts',
        },
        output: {
			filename: '[name].js',
//			filename: 'nunjucks.js',
//            path: path.resolve(__dirname, env.BUILDDIR),
            path: path.resolve(__dirname, 'browser'),
            publicPath: '/',
        },
		devtool: 'source-map',
		optimization: {
			moduleIds: 'deterministic',
			runtimeChunk: 'single',
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
				},
			}
		},
		resolve: {
/*		
			alias: {
				Common: '/var/www/vos/src/common',
				Browser: '/var/www/vos/src/browser',
				BrowserOnly: '/var/www/vos/src/browser'
				* Deliberately excluded server-side directories, e.g. Server, Deploy *
			},
*/			
			extensions: ['.ts','.js'],
			fallback: {
//XXX would be nice to separate out the server-specific code
				'fs':false,
				'path':false,
				'stream':false,
				'os':false,
				'fsevents':false
    		}
		},
		module: {
			rules: [{
				test: /\.ts$/,

				use: {
					loader: 'ts-loader',
					options: {
						//XXX without this option MIGHT be possible to share compiled code
						//  between server and client. Includes and excudes come from tsconfig.json.
						//  Having troble excluding vos/node_modules
	 					//onlyCompileBundledFiles: true,
						configFile: 'tsconfig.browser.json'
					}
				},
			}]
		},
		plugins: [
			new BundleAnalyzerPlugin({analyzerMode:'static',openAnalyzer:false}),

//XXX Maybe add WorkboxPlugin to improve offline use. See "Progressive Web Application in Webpack 

       ]
    };
};
