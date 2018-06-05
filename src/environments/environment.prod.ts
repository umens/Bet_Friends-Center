export const environment = {
  production: true,
  hmr: false,
  loggers: [
    {
      'loggerName': 'console',
      'loggerLocation': '',
      'isActive': true
    },
    {
      'loggerName': 'localstorage',
      'loggerLocation': 'logging',
      'isActive': true
    },
    {
      'loggerName': 'webapi',
      'loggerLocation': '/api/log',
      'isActive': true
    }
  ]
};
