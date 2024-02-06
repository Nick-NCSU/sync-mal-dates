const { MAL_BASE_URL, MAL_CLIENT_ID, MAL_USERNAME } = process.env;

const DEFAULT_OPTIONS = {
  headers: {
    "X-MAL-CLIENT-ID": MAL_CLIENT_ID,
  },
};

async function makeRequest(url, options = DEFAULT_OPTIONS) {
  return fetch(url, options)
    .then((res) => res.json())
    .catch(console.log);
}

export async function fetchAnimeList() {
  const shows = [];

  const params = new URLSearchParams({
    limit: 1000,
    offset: 0,
    fields: "node,list_status",
    nsfw: true,
  });
  let pageUrl = `${MAL_BASE_URL}/users/${MAL_USERNAME}/animelist?${params.toString()}`;

  do {
    const response = await makeRequest(pageUrl);

    shows.push(...response.data);
    pageUrl = response.paging?.next;
  } while (pageUrl);

  return shows;
}
