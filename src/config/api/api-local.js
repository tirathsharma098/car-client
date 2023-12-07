const protocol = 'http';
// const host = "localhost";
const host = 'localhost';
const port = '3010';
const trailUrl = '/api/v1';

const hostUrl = `${protocol}://${host}${port ? ':' + port : ''}`;
const endpoint = `${protocol}://${host}${port ? ':' + port : ''}${trailUrl}`;
const apiAll = {
  endpoint: endpoint,
  hostUrl: hostUrl,
};
export default apiAll;
