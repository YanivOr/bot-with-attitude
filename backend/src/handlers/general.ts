import queryString from 'querystring';

export const parseQueryString = (qs: string) => {
  return queryString.parse(qs.replace(/^.*\?/, ''));
};
