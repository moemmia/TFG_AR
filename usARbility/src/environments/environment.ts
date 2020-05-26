// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const firebaseEnvConfig = {
  apiKey: "AIzaSyAq8hqdgiy5IZbpJ9BhLhlQUYt9VW0kqRU",
  authDomain: "usarbility.firebaseapp.com",
  databaseURL: "https://usarbility.firebaseio.com",
  projectId: "usarbility",
  storageBucket: "",
  messagingSenderId: "254079320190",
  appId: "1:254079320190:web:f29e90250f13460c"
}

export const foundation = {
  perception: 'perception',
  ergonomics: 'ergonomics',
  presence: 'presence',
  availability: 'availability',
  easy: 'easy',
  comment: 'comment'
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
