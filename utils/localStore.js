export default{
  saveItem(k, v) {
    window.localStorage.setItem(k, v)
  },
  getItem(k) {
    return window.localStorage.getItem(k)
  },
  removeItem(k) {
    window.localStorage.removeItem(k)
  }
}

