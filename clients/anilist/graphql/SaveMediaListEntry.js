export default `
mutation ($id: Int!, $mediaId: Int!, $startedAt: FuzzyDateInput, $completedAt: FuzzyDateInput) {
  SaveMediaListEntry (id: $id, mediaId: $mediaId, startedAt: $startedAt, completedAt: $completedAt) {
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
  }
}`;
