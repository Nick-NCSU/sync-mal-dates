import user from "./graphql/User.js";
import mediaListCollection from "./graphql/MediaListCollection.js";
import saveMediaListEntry from "./graphql/SaveMediaListEntry.js";

const { ANILIST_BASE_URL, ANILIST_ACCESS_TOKEN } = process.env;

function buildOptions(query, variables) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + ANILIST_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  };
}

async function makeRequest(url, options) {
  return fetch(url, options)
    .then((res) => res.json())
    .catch(console.log);
}

export async function queryUser() {
  return makeRequest(ANILIST_BASE_URL, buildOptions(user));
}

export async function queryMediaListCollection(userId) {
  return makeRequest(
    ANILIST_BASE_URL,
    buildOptions(mediaListCollection, {
      userId,
    }),
  );
}

export async function mutationSaveMediaListEntry(
  id,
  mediaId,
  startedAt,
  completedAt,
) {
  return makeRequest(
    ANILIST_BASE_URL,
    buildOptions(saveMediaListEntry, {
      id,
      mediaId,
      startedAt,
      completedAt,
    }),
  );
}
