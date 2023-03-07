export default (url: string, token: string) =>
  fetch(url, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
