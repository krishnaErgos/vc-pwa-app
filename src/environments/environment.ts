// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseURL : 'http://prodapi.grainbank.in/api/reports',
  filterURL: 'https://devapi.grainbank.in/api/reports/master',
  searchURL : 'https://devapi.grainbank.in/api/transactional/reports/v1',
  showReports : true,
 grianBankWebApi : 'https://devapi.grainbank.in',
  debitCreditNoteURL : 'https://devapi.grainbank.in/api/reports/master',
  extrenalAPI: 'https://devextrenalapiintegration.grainbank.in',
  version : 'v1',
  version2 : 'v2',
  version4 : 'v4',
  username : 'admin',
  password : 'reports',
  users : [{
    username: 'admin',
    password: 'reports'
  }, {
    username: 'admin',
    password: 'admin'
  }, {
    username: 'user',
    password: 'user'
  }]
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
