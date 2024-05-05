import { vietNamArray, fantasyArray } from "./arrays.js";

let voices = [];
let femaleVoice = null;

function initVoices() {
    voices = speechSynthesis.getVoices();
    // Tìm giọng nữ tiếng Anh Anh
    femaleVoice = voices.find(
        (voice) => voice.lang === "en-GB" && voice.gender === "female"
    );
}

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = initVoices;
}

function translate() {
    const direction = document.getElementById("direction").value;
    const inputText = document.getElementById("inputText").value.trim();
    const outputDiv = document.getElementById("output");

    let sourceArray, targetArray;
    if (direction === "toFantasy") {
        sourceArray = vietNamArray.map((word) => word.toLowerCase());
        targetArray = fantasyArray;
    } else {
        sourceArray = fantasyArray.map((word) => word.toLowerCase());
        targetArray = vietNamArray;
    }

    const elements = inputText.split(/([.,!?\s]+)/);
    let translatedElements = elements.map((element) => {
        if (element.match(/[.,!?\s]+/)) {
            return element;
        } else {
            const lowerWord = element.toLowerCase();
            const index = sourceArray.indexOf(lowerWord);
            return index !== -1 ? targetArray[index] : element;
        }
    });

    let capitalizeNext = true;
    translatedElements = translatedElements.map((element) => {
        if (/[.!?]/.test(element)) {
            capitalizeNext = true;
            return element;
        } else if (capitalizeNext) {
            capitalizeNext = false;
            return element.charAt(0).toUpperCase() + element.slice(1);
        } else {
            return element;
        }
    });

    outputDiv.textContent = translatedElements.join("");
}

function speakEnglish() {
    const text = document.getElementById("output").textContent;
    const msg = new SpeechSynthesisUtterance(text);
    if (femaleVoice) {
        msg.voice = femaleVoice; // Sử dụng giọng nữ đã tìm được
    } else {
        msg.lang = "en-GB"; // Mặc định giọng Anh nếu không tìm thấy giọng nữ
    }
    // Điều chỉnh tốc độ đọc và độ cao để tạo hiệu ứng huyền thoại
    msg.rate = 0.75; // Chậm lại một chút
    msg.pitch = 1.5; // Tăng độ cao để giọng nói nghe cao và thanh thót hơn

    speechSynthesis.speak(msg);
}

document.getElementById("translateButton").addEventListener("click", translate);
document.getElementById("speakButton").addEventListener("click", speakEnglish);
