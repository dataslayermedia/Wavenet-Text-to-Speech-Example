# Text to Speech Using Google's Wavenet Model
This script can be run locally on Mac or Linux OS to transpose a text file "text.txt" into a series of sequential dictated audio files. A great use case it to transpose pdf's documents into audio books.

### Create a Service Account

### Download Node.js
Linux

sudo apt-get install node
sudo apt-get install npm



### Download dependencies
From the command line navigate into the Wavenet-Text-to-Speech-Example and run the following command.
`npm install`

### Execute Script
Swap out the location of your service account json key file.
`GOOGLE_APPLICATION_CREDENTIALS="/Users/refactored/Desktop/wavenet-service-account.json" npm start`

The above command allows us to bypass having to download the gcloud SDK utility by directly passing our service account credentials.


## YouTube Step by Step Tutorial

https://www.youtube.com/watch?v=uxjPTalCCT0

 [![](http://img.youtube.com/vi/uxjPTalCCT0/0.jpg)](https://www.youtube.com/watch?v=uxjPTalCCT0)




