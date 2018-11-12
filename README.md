# umich-lecture-downloader
Chrome extension made to easily download CAEN lectures


### How it works

- Every video on the CAEN lecture viewer is hosted on AWS S3, and the .mp4 link is embedded in the DOM
- This extension searches the DOM for the S3 URL, and calls the Chrome Downloads API to download it from the browser (see popup.js)
- Most of the code was repurposed from the example in the Chrome Extension documentation