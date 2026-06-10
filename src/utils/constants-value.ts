import * as types from './types'

export const RSA_KEY_STORAGE_KEY = 'n6GTpmVjp3'

export const themeSite = {
  dark: 'dracula',
  light: 'garden'
}

export const themeList = ['dracula', 'night', 'garden', 'light']

export const toastTypes: types.IToastTypes = {
  success: 'btn btn-success',
  error: 'btn btn-error',
  info: 'btn btn-info',
  warning: 'btn btn-warning'
}

export const routerList = [
  { routeName: 'Token Convert', pathname: '/' },
  { routeName: 'QR Generator', pathname: '/qr-generator' },
  { routeName: 'Encode/Decode Base64', pathname: '/base64' },
  { routeName: 'Encode/Decode URI', pathname: '/uri-tool' },
  { routeName: 'Encrypt/Decrypt RSA', pathname: '/rsa-tool' },
  { routeName: 'JSON to Interface', pathname: '/json-to-interface' }
  // { routeName: 'Convert Text Format', pathname: '/convert-text-format' }
  // { routeName: 'QR Deeplink Generator', pathname: '/deeplink-generator' }
  // { routeName: 'Term and condition Generator', pathname: '/t-and-c-generator' }
]
