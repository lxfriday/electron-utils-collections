const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': resolve('src'),
    },
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'eslint-loader',
        },
        exclude: /node_modules/,
        enforce: 'pre', // 强制最先使用eslint-loader处理
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192, // 8M
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: false,
    progress: true,
    port: 9000,
    inline: true,
  },
};

// 当资源发生改变，以下三种方式都会生成新的bundle，但是又有区别：

// // 1. 不会刷新浏览器
// $ webpack-dev-server
// //2. 刷新浏览器
// $ webpack-dev-server --inline
// //3. 重新加载改变的部分，HRM失败则刷新页面
// $ webpack-dev-server  --inline --hot
