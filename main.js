const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
var player = require('play-sound')(opts = {});

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

var playInRealTime = true;

(async function () {

  // The text to synthesize
  var text = fs.readFileSync('./text.txt', 'utf8');

  // We split by sentences so the audio files don't break mid-sentence.
  var arrayOfSentences = text.match(/[^\.]+\./g);

  var charCount = 0;
  var textChunk = "";
  var index = 0;

  // Construct the request
  var request = {
    input: {
      text: textChunk
    },
    voice: {
      languageCode: 'en-US',
      ssmlGender: 'MALE',
      name: "en-US-Wavenet-B"
    },
    audioConfig: {
      effectsProfileId: [
        "headphone-class-device"
      ],
      pitch: -4,
      speakingRate: 1.18,
      audioEncoding: "MP3"
    },
  };

  // Iterate over sentences.
  for (var n = 0; n < arrayOfSentences.length; n++) {

    charCount += arrayOfSentences[n].length;
    textChunk = textChunk + arrayOfSentences[n];

    // Ensure payload doesn't exceed 5k limit
    if (charCount > 4600 || n == arrayOfSentences.length - 1) {

      request.input.text = textChunk;

      // Performs the text-to-speech request
      const [response] = await client.synthesizeSpeech(request);

      // Write the binary audio content to a local file
      const writeFile = util.promisify(fs.writeFile);

      var fileName = 'The_Psychology_of_Human_Misjudgment_' + index + '.mp3';

      await writeFile(fileName, response.audioContent, 'binary');
      console.log('Audio content written to file: output.mp3');
      index++;

      charCount = 0;
      textChunk = "";

      // Begin Playing First File
      console.log("Playing file: " + fileName);

      playInRealTime && (index == 1) && player.play('./' + fileName, function (err) {
        console.log(err);
      })

    }
  }
}());