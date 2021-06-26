const config = {
  mode: 'site',
  title: 'Database Guidebook',
  description: 'Database 完全知识体系',
  base: '/database-guidebook/',
  publicPath: '/database-guidebook/',
  favicon: './favicon.ico',
  logo: 'http://img.mrsingsing.com/database-guidebook-favicon.png',
  exportStatic: {},
  navs: [
    null,
    {
      title: 'Github',
      path: 'https://github.com/tsejx/database-guidebook',
    },
  ],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'database',
      },
    ],
  ],
};

if (process.env.NODE_ENV !== 'development') {
  config.ssr = {};
}

export default config;
