// Function to convert numbers to words
function numberToWords(num) {
  const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const thousands = ["", "Thousand", "Million", "Billion", "Trillion"];

  if (num === 0) return "Zero";

  let word = "";
  let i = 0;

  while (num > 0) {
    const chunk = num % 1000;

    if (chunk > 0) {
      let chunkWord = "";
      const hundreds = Math.floor(chunk / 100);
      const remainder = chunk % 100;

      if (hundreds > 0) {
        chunkWord += `${units[hundreds]} Hundred `;
      }
      if (remainder > 10 && remainder < 20) {
        chunkWord += `${teens[remainder - 11]} `;
      } else {
        const tensPlace = Math.floor(remainder / 10);
        const unitsPlace = remainder % 10;

        if (tensPlace > 0) chunkWord += `${tens[tensPlace]} `;
        if (unitsPlace > 0) chunkWord += `${units[unitsPlace]} `;
      }

      word = `${chunkWord}${thousands[i]} ${word}`.trim();
    }

    num = Math.floor(num / 1000);
    i++;
  }

  return word.trim();
}

function convertAndSpeak() {
  const input = document.getElementById("numberInput").value;
  const number = parseInt(input, 10);

  if (isNaN(number)) {
    document.getElementById("result").textContent = "Please enter a valid number!";
    return;
  }

  const words = numberToWords(number);
  document.getElementById("result").textContent = words;


  const speech = new SpeechSynthesisUtterance(words);
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
}
