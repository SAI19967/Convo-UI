
const openButton = document.getElementById('openButton');
const closeButton = document.getElementById('closeButton');
const cameraCard = document.getElementById('cameraCard');
const cameraFeed = document.getElementById('cameraFeed');
const capturePictureButton = document.getElementById('capturePicture');
const startVideoButton = document.getElementById('startVideo');
const stopVideoButton = document.getElementById('stopVideo');
const crossButton = document.getElementById('crossButton');
const okayButton = document.getElementById('okayButton');
const uploadFileInput = document.getElementById('uploadFile');
const imageContainer = document.getElementById('imageContainer');
const uploadButton = document.getElementById('uploadButton');


let capturedPicture = null;
let cameraStream = null;
let mediaRecorder;
let videoChunks = [];

openButton.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            openButton.style.display = 'none';
            closeButton.style.display = 'block';
            cameraFeed.style.display = 'block';
            capturePictureButton.style.display = 'block';
            startVideoButton.style.display = 'block';
            cameraCard.style.display="block"

            cameraFeed.srcObject = stream;
            cameraStream = stream;
        })
        .catch(function (error) {
            console.error('Error accessing camera:', error);
        });
});

closeButton.addEventListener('click', () => {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    openButton.style.display = 'block';
    closeButton.style.display = 'none';
    cameraFeed.style.display = 'none';
    capturePictureButton.style.display = 'none';
    startVideoButton.style.display = 'none';
    stopVideoButton.style.display = 'none';
    crossButton.style.display = 'none';
    okayButton.style.display = 'none';
    uploadButton.style.display = 'none';
    cameraCard.style.display="none"
    uploadFileInput.style.display = 'none';
    imageContainer.style.display = 'none';
    uploadButton.style.display = 'none';
    capturedPicture = null;
    stopRecording();

    // Additional code to reset the UI to the initial state
    capturedPicture = null;
    videoChunks = [];
});

capturePictureButton.addEventListener('click', () => {
    if (cameraStream) {
        // Check if the video feed has loaded
        if (cameraFeed.videoWidth > 0 && cameraFeed.videoHeight > 0) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = cameraFeed.videoWidth;
            canvas.height = cameraFeed.videoHeight;
            context.drawImage(cameraFeed, 0, 0, canvas.width, canvas.height);
            const picture = canvas.toDataURL('image/jpeg', 0.8);
            capturedPicture = picture;

            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
                cameraStream = null;
            }

            cameraFeed.style.display = 'none';
            const imageElement = document.createElement('img');
            imageElement.src = picture;
            imageContainer.innerHTML = '';
            imageContainer.appendChild(imageElement);
            imageContainer.style.display = 'block';

            capturePictureButton.style.display = 'none';
            startVideoButton.style.display = 'none';
            uploadButton.style.display = 'block';
        }
    }
});


startVideoButton.addEventListener('click', () => {
    startVideoButton.style.display = 'none';
    stopVideoButton.style.display = 'block';
    capturePictureButton.style.display = 'none';
    closeButton.disabled = true;

    if (cameraStream) {
        mediaRecorder = new MediaRecorder(cameraStream);
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                videoChunks.push(event.data);
            }
        };
        mediaRecorder.onstop = () => {
            const videoBlob = new Blob(videoChunks, { type: 'video/webm' });
            const videoURL = URL.createObjectURL(videoBlob);
            cameraFeed.srcObject = null;
            cameraFeed.src = videoURL;
            cameraFeed.style.display = 'block';
            crossButton.style.display = 'block';
            okayButton.style.display = 'block';
        };

        mediaRecorder.start();
    }
});

stopVideoButton.addEventListener('click', () => {
    stopVideoButton.style.display = 'none';
    crossButton.style.display = 'block';
    okayButton.style.display = 'block';
    closeButton.disabled = false;
    uploadButton.style.display = 'none';
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
});

crossButton.addEventListener('click', () => {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
    }
    cameraFeed.style.display = 'none';
    startVideoButton.style.display = 'none';
    stopVideoButton.style.display = 'none';
    crossButton.style.display = 'none';
    okayButton.style.display = 'none';

    // Restart the camera by opening it again
    openButton.click();
});

okayButton.addEventListener('click', () => {
    crossButton.style.display = 'none'; // Hide the Cross button
okayButton.style.display = 'none'; // Hide the Okay button
uploadButton.style.display = 'block'; // Show the Upload button
});

uploadButton.addEventListener('click', () => {
    if (capturedPicture) {
        // Handle the upload of the captured image (e.g., send it to a server)
        console.log('Uploaded picture:', capturedPicture);
    }
    if (videoChunks.length > 0) {
        // Handle the upload of the recorded video (e.g., send it to a server)
        const videoBlob = new Blob(videoChunks, { type: 'video/webm' });
        // You can upload videoBlob to your server.
        console.log('Uploaded video:', videoBlob);
    }
});

uploadFileInput.addEventListener('change', () => {
    console.log('Selected file:', uploadFileInput.files[0]);
});
// ***************************code for Screen short
document.getElementById("captureEntireScreen").addEventListener("click", function() {
    captureScreenshot();
});

function captureScreenshot() {
    const screenshotImage = document.getElementById("screenshotImage");
    screenshotImage.style.display = "none";

    navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: 'screen' } })
        .then(stream => {
            screenshotImage.srcObject = stream;
            screenshotImage.style.display = "block";
        })
        .catch(error => {
            console.error("Error capturing screenshot:", error);
        });
}

// *************************code for Voice Recording***********************

let audioChunks = [];
const startRecordingButton = document.getElementById("startRecording");
const stopRecordingButton = document.getElementById("stopRecording");
const recordingProgressElement = document.getElementById("recordingProgress");
const voiceCrossButton = document.getElementById("voiceCrossButton");
const voiceOkayButton = document.getElementById("voiceOkayButton");
const uploadVoiceRecordingButton = document.getElementById("uploadVoiceRecordingButton");
const recordedAudio = document.getElementById("recordedAudio");

startRecordingButton.addEventListener("click", startRecording);
stopRecordingButton.addEventListener("click", stopRecording);

function startRecording() {
    startRecordingButton.style.display = "none";
    stopRecordingButton.style.display = "inline";
    recordingProgressElement.style.display = "inline";
    recordingProgressElement.value = 0; // Reset progress to 0;

    let recordingProgress = 0;
    const progressInterval = setInterval(() => {
        recordingProgress += 1;
        recordingProgressElement.value = recordingProgress;

        if (recordingProgress >= 100) {
            clearInterval(progressInterval);
        }
    }, 1000);

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                clearInterval(progressInterval);
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                recordedAudio.src = audioUrl;
                recordedAudio.style.display = "block";
            };

            mediaRecorder.start();
        })
        .catch(error => {
            console.error("Error starting recording:", error);
        });
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        stopRecordingButton.style.display = "none";
        recordingProgressElement.style.display = "none";
        voiceCrossButton.style.display = "inline";
        voiceOkayButton.style.display = "inline";
    }
}

function handleCrossClick() {
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
    }

    startRecordingButton.style.display = "inline";
    voiceCrossButton.style.display = "none";
    voiceOkayButton.style.display = "none";
    recordedAudio.style.display = "none"; // Hide audio controls
}

function handleOkayClick() {
    uploadVoiceRecordingButton.style.display = "inline";
    voiceOkayButton.style.display = "none";
    voiceCrossButton.style.display = "none";
}

// *****************Code for Extra*************
function closedWindow(windowClosed){
   const windowCloseds = document.getElementById(windowClosed);
   windowCloseds.style.display="none"; 
}
function openWindow(windowOpen){
    const windowOpens= document.getElementById(windowOpen);
    windowOpens.style.display="block"
}