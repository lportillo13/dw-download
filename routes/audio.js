const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const spawn = require('child_process').spawn;

router.use(bodyParser.json());

router.post('/download', async (req, res) => {
  try {
    const { videoUrl } = req.query;
    console.log(videoUrl);
    if (!videoUrl) {
      return res.status(400).send('Please provide a valid YouTube video URL');
    }
    const videoId = ytdl.getVideoID(videoUrl);
    const videoInfo = await ytdl.getInfo(videoId);
    const audioStream = ytdl(videoId, { filter: 'audioonly' });
    const ffmpegProcess = spawn(ffmpeg, [
      '-i', 'pipe:0',
      '-f', 'mp3',
      '-ab', '64k',
      '-ac', '2',
      '-ar', '44100',
      '-',
    ]);
    audioStream.pipe(ffmpegProcess.stdin);
    ffmpegProcess.stdout.pipe(res);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
