export const environment = {
  production: false,
  hmr: true,
  loggers: [
    {
      'loggerName': 'console',
      'loggerLocation': '',
      'isActive': true
    },
    {
      'loggerName': 'localstorage',
      'loggerLocation': 'logging',
      'isActive': false
    },
    {
      'loggerName': 'webapi',
      'loggerLocation': '/api/log',
      'isActive': false
    }
  ]
};
