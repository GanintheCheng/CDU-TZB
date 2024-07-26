module.exports = {
    plugins: {
      'postcss-pxtorem': {
        rootValue({ file }: { file: string }) {
          return file.includes('vant') ? 37.5 : 75;
        },
        propList: ['*'],
      },
    },
  };