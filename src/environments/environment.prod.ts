import packageJson from '../../package.json';

export const environment = {
  production: true,
  version: packageJson.version,
  firebaseConfig: {
    apiKey: 'AIzaSyDu79m_qmgZGcwpuQAPJGDsZ2cGXrgd1eE',
    authDomain: 'gameanalysis-mgm12.firebaseapp.com',
    projectId: 'gameanalysis-mgm12',
    storageBucket: 'gameanalysis-mgm12.appspot.com',
    messagingSenderId: '15625157278',
    appId: '1:15625157278:web:9c508e3c7759755dded98f',
    measurementId: 'G-1C59CKFJS1',
  },
};
