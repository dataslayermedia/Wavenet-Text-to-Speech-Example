// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function quickStart() {


  // The text to synthesize

  var text = fs.readFileSync('./text.txt', 'utf8');

  //text = text.replace(/[\r\n\t]+|[\s]{2,}/g, '');

  var newArr = text.match(/[^\.]+\./g);


  var charCount = 0;
  var textChunk = "";
  var index = 0;

  for (var n = 0; n < newArr.length; n++) {

    //console.log(newArr[n].length);

    charCount += newArr[n].length;
    textChunk = textChunk + newArr[n];


    console.log(charCount);

    if (charCount > 4600 || n == newArr.length - 1) {

      console.log(textChunk);



      // Construct the request
      const request = {
        input: {
          text: textChunk
        },
        // Select the language and SSML voice gender (optional)
        voice: {
          languageCode: 'en-US',
          ssmlGender: 'MALE',
          name: "en-US-Wavenet-B"
        },
        // select the type of audio encoding
        audioConfig: {
          effectsProfileId: [
            "headphone-class-device"
          ],
          pitch: -4,
          speakingRate: 1.18,
          audioEncoding: "MP3"
        },
      };

      // Performs the text-to-speech request
      const [response] = await client.synthesizeSpeech(request);

      console.log(response);

      // Write the binary audio content to a local file
      const writeFile = util.promisify(fs.writeFile);
      await writeFile('The_Psychology_of_Human_Misjudgment_' + index + '.mp3', response.audioContent, 'binary');
      console.log('Audio content written to file: output.mp3');


      index++;


      charCount = 0;
      textChunk = "";

    }


  }


}
quickStart();