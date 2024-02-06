import "./config.js";
import {
  mutationSaveMediaListEntry,
  queryMediaListCollection,
  queryUser,
} from "./clients/anilist/index.js";
import { fetchAnimeList } from "./clients/myanimelist/index.js";

const userId = (await queryUser()).data.Viewer.id;
const mediaLists = (await queryMediaListCollection(userId)).data
  .MediaListCollection.lists;

const malList = await fetchAnimeList();

const dateToFuzzyDateInput = (date) => {
  if (!date) return;
  const [year, month, day] = date.split("-");
  return { year: +year, month: +month, day: +day };
};

const malIdDateMap = malList.reduce(
  (acc, { node, list_status: listStatus }) => {
    acc[node.id] = {
      startedAt: dateToFuzzyDateInput(listStatus.start_date),
      completedAt: dateToFuzzyDateInput(listStatus.finish_date),
    };
    return acc;
  },
  {},
);

const datesEqual = (a, b) => {
  return a.year === b.year && a.month === b.month && a.day === b.day;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

for (const list of mediaLists) {
  for (const show of list.entries) {
    const malShow = malIdDateMap[show.media.idMal];
    if (!malShow) continue;

    let updateDate = false;
    const { startedAt, completedAt } = malShow;
    if (startedAt) {
      if (!show.startedAt || !datesEqual(show.startedAt, startedAt)) {
        updateDate = true;
      }
    }

    if (completedAt) {
      if (!show.completedAt || !datesEqual(show.completedAt, completedAt)) {
        updateDate = true;
      }
    }

    if (updateDate) {
      await mutationSaveMediaListEntry(
        show.id,
        show.mediaId,
        startedAt,
        completedAt,
      );
      await sleep(5_000);
    }
  }
}
