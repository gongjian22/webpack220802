const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: '/src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/gong.js',
    clean: true // 自动清空上次打包内容
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset',
        parser: {
          dataUrlConditioin: {
            // 小雨10kb的图片转base64
            maxSize: 10 * 1024
          }
        },
        generator: {
          // 输出图片的名称
          filename: 'static/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff2?|map3|map4|avi)$/,
        type: 'asset/resource',
        generator: {
          // 输出的名称
          filename: 'static/media/[hash:10][ext][query]'
        }
      }
    ]
  },
  // 插件都是构造函数，需要new
  plugins: [
    new ESLintPlugin({
      // 检测src文件
      context: path.resolve(__dirname, 'src')
    })
  ],
  mode: 'development'
}
