export function getCookie(name: string) {
  return document.cookie.split('; ').find(item => item.startsWith(`${name}`))?.split('=')[1];
}

export function removeCookie(name: string) {
  document.cookie = `${name}=; Max-Age=-99999999`
}

export function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}`;
}
