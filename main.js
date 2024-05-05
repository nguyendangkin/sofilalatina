import { vietNamArray, fantasyArray } from "./arrays.js";

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

    // Phân tích và lưu trữ mọi thành phần, bao gồm từ, dấu câu và khoảng trắng
    const elements = inputText.split(/([.,!?\s]+)/);

    // Dịch các từ đã được làm sạch và giữ nguyên dấu câu/khoảng trắng
    let translatedElements = elements.map((element, index) => {
        if (element.match(/[.,!?\s]+/)) {
            return element; // Trả về dấu câu và khoảng trắng không đổi
        } else {
            const lowerWord = element.toLowerCase();
            const index = sourceArray.indexOf(lowerWord);
            return index !== -1 ? targetArray[index] : element; // Dịch nếu tìm thấy
        }
    });

    // Viết hoa chữ cái đầu sau dấu chấm
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

    // Ghép lại để tạo thành câu hoàn chỉnh
    outputDiv.textContent = translatedElements.join("");
}

document.getElementById("direction").addEventListener("change", function () {
    document.getElementById("inputText").value = ""; // Xóa trường nhập khi thay đổi hướng dịch
    document.getElementById("output").textContent = ""; // Tùy chọn xóa kết quả
});

document.getElementById("translateButton").addEventListener("click", translate);
