export const prefixUrl = "https://www.fastmock.site/mock/042f912aaf083ad3c43c77bfc5a32577/api";

export const customFetch = async url => {
  const resp = await fetch(url);
  return await resp.json();
};
