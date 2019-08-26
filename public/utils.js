function request(options) {
  return fetch(options.url, options).then(res => res.json());
}