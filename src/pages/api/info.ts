import Youtube from 'youtube-stream-url';

function secsToMinsFormat(secs) {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

export default async function handler(req, res) {
  try {
    const query = req.query;

    const video = await Youtube.getInfo({
      url: query.url
    });

    const videoDetails = video.videoDetails;

    const formattedVideoLength = secsToMinsFormat(videoDetails.lengthSeconds);

    res.status(200).json({
      video_info: {
        author: videoDetails.author,
        title: videoDetails.title,
        description: videoDetails.shortDescription,
        views: videoDetails.viewCount,
        keywords: videoDetails.keywords,
        duration: formattedVideoLength,
        thumbnails: videoDetails.thumbnail,
        isPrivate: videoDetails.isPrivate || false,
        isUnpluggedCorpus: videoDetails.isUnpluggedCorpus || false,
        isLiveContent: videoDetails.isLiveContent || false
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

