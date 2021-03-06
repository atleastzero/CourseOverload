module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: "babel-loader" },
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
    ]
  }
};