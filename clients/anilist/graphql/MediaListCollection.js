export default `
query ($userId: Int!) {
  MediaListCollection (userId: $userId, type: ANIME) {
    lists {
      status,
      entries {
        id,
        mediaId,
        startedAt {
          year,
          month,
          day
        },
        completedAt {
          year,
          month,
          day
        }
        media {
          idMal
        }
      }
    }
  }
}`;
