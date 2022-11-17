const getMusics = async (id) => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
  const requestJson = await request.json();
  const final = requestJson.results;
  return final.map(({ trackName,
    trackNumber, trackId, previewUrl, collectionName, artworkUrl100,
    artistName }) => (
    { trackName,
      trackNumber,
      trackId,
      previewUrl,
      collectionName,
      artworkUrl100,
      artistName }));
};

export default getMusics;
