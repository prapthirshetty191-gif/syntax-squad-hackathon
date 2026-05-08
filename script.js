function activateSOS() {
alert("🚨 SafeNest SOS Activated!");
}

function shareAlert() {
alert("📤 Emergency Alert Shared!");
}

let voiceDetectionEnabled = false;

document.getElementById("voiceToggle")
.addEventListener("change", function () {

voiceDetectionEnabled = this.checked;

const micStatus =
document.getElementById("micStatus");

if (voiceDetectionEnabled) {

micStatus.innerHTML =
"🎙️ Microphone active - Listening for emergencies";

startVoiceDetection();

} else {

micStatus.innerHTML =
"🎙️ Microphone inactive";
}
});

function startVoiceDetection() {

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if (!SpeechRecognition) {
alert("Speech Recognition not supported.");
return;
}

const recognition = new SpeechRecognition();

recognition.continuous = true;

recognition.onresult = function(event) {

const transcript =
event.results[
event.results.length - 1
][0].transcript.toLowerCase();

const panicWords = [
"help",
"danger",
"save me",
"emergency",
"stop"
];

panicWords.forEach(word => {

if (transcript.includes(word)) {

showEmergencyWarning(word);
}
});
};

recognition.start();
}

function showEmergencyWarning(reason){

const confirmed = confirm(
`Possible emergency detected: ${reason}\n\nActivate SOS?`
);

if(confirmed){
activateSOS();
}
}
