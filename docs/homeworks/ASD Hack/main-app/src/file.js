export const getFile = () => {
  const url = new URLSearchParams(window.location.search).get('target');

  if (!url) {
    return {
      status: 404,
      url: ''
    };
  }

  return {
    status: 200,
    url: decodeURIComponent(url)
  };
}
