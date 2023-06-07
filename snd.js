var snd, sndPick, isLoaded = false;
var isPlaying = false;
var audioCtx;
const sounds = ['01','02','03','04','05a','05b','05c','05d',
                '06','07','08a','08b','09','10','11a','11b','12'];
let buffers = [];
var activeSounds = [];

for(let i = 0; i < sounds.length; i++)
{
    buffers[i] = null;
}

function loadSnd(index) {
    const request = new XMLHttpRequest();
    request.open("GET", `./snd/${sounds[index]}.wav`);
    request.responseType = "arraybuffer";
    request.onload = function() {
    let undecodedAudio = request.response;
    audioCtx.decodeAudioData(undecodedAudio, (data) => buffers[index] = data);
    };
    request.send();
};

function playSnd(index) {
    const source = audioCtx.createBufferSource();
    activeSounds.push(source);
    source.buffer = buffers[index];
    source.connect(audioCtx.destination);
    source.start(audioCtx.currentTime); // play the source immediately
};

// function playBgSnd(index,level) {
//     const source = audioCtx.createBufferSource();
//     source.buffer = buffers[index];
//     source.loop = true;
//     activeSounds.push([source,level]);
//     source.connect(audioCtx.destination);
//     source.start(audioCtx.currentTime); // play the source immediately
// }

function stopSnd() {
    for(let i = 0; i < activeSounds.length; i++)
    {
        activeSounds[i].stop(audioCtx.currentTime); 
    }
}
// function stopBgSnd(level)
// {
//     for(let i = 0; i < activeSounds.length; i++)
//     {
//         if(activeSounds[i][1] == level) 
//         { 
//             activeSounds[i][0].stop(audioCtx.currentTime); 
//         }

//     }
// }

// function sndTest() {
//     if(!sndTestTick)
//     {
//         playBgSnd(151,'bglobby'); playBgSnd(152,'key1'); playBgSnd(153,'key2'); playBgSnd(154,'key3'); playBgSnd(155,'puzzle4'); //for test
//         sndTestTick = true;
//     }
// }

function initSnd()
{
        document.getElementById('opening').style.display = 'none';
        document.getElementById('container').style.display = 'block';
        // document.getElementById('startdiv').remove();
        var AudioContext = window.AudioContext || window.webkitAudioContext;   
        audioCtx = new AudioContext();

        for(let i = 0; i < sounds.length; i++)
        {
            loadSnd(i);
        }
}

function checkBuffers()
{
    let buffCount = 0;
    for(let i = 0; i < sounds.length; i++)
    {
        if(buffers[i] != null) { buffCount++; }
    }
    if(buffCount == numberOfSounds) {  
        soundsLoaded = true; 
        if(page == 0 && soundsLoaded) { 
            document.getElementById('p1').innerHTML = 'Click "Next" to Begin.'
            document.getElementById('next').style.display = 'inline';
        }
        clearInterval(loading); 
    }
}