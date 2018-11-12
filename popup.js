// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let downloadButton = document.getElementById('downloadButton')

// downloadButton.onclick = function() {
//  console.log('clickin');
//  // print DOM
// };

downloadButton.addEventListener('click', () => {
    console.log("Popup DOM fully loaded and parsed");

    // var fn = function getLectureTitle() {
                    
    //     console.log(title);
    //     return 'Good Title';
    // }

    function getLecture() {
        let html = document.body.innerHTML;
        let s3LinkStart = html.indexOf('s3.amazonaws.com/leccap.engin.umich.edu/');

        if (s3LinkStart != -1) {
            let s3LinkEnd = html.indexOf('.mp4', s3LinkStart) + 4; // 4 is length of '.mp4'
            var s3Link = html.substring(s3LinkStart, s3LinkEnd);
            s3Link = `http://${s3Link}`;
        } else {
            console.log('No lecture download link on this page')
        }

        let input = document.getElementsByClassName('content-header-recording-title');
        elts = [...input]

        let title = 'Lecture'
        if (elts.length > 0) {
            title = elts[0].innerHTML;
        }

        return {
            'title': title,
            'link': s3Link
        };
    }


    // We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
            code: '(' + getLecture + ')();' //argument here is a string but function.toString() returns function's code
    }, (lectureResults) => {
        let lecture = lectureResults[0]
        let fileName = `${lecture['title']}.mp4`
        chrome.downloads.download({url: lecture['link'], filename: fileName});  
    });
});