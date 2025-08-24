// Element secimleri
const buttonsEl = document.getElementById("calculaterButtons");
const displayEl = document.getElementById("display");
const displayElTwo = document.getElementById("previousOperation");

// değişkenler
let firstNumber = "";
let selectOperator = "";
let afterNumber = "";
let isWaitingANewValue = false;
let lastOperationWasEquals = false;

// Event listener'lar
buttonsEl.addEventListener("click", write);
document.addEventListener("keydown", handleKeyboard);

function write(e) {
  const element = e.target;

  if (element.classList.contains("number-btn")) {
    handleNumber(element.value);
  } else if (element.classList.contains("operator-btn")) {
    handleOperator(element.value);
  } else if (element.classList.contains("equals-btn")) {
    handleEquals();
  } else if (element.classList.contains("clear-btn")) {
    clearAll();
  } else if (element.classList.contains("backspace-btn")) {
    backspace();
  }
}

// Sayı girişi işleme fonksiyonu
function handleNumber(value) {
  // Eğer son işlem eşittir ise ve yeni sayı giriliyor ise, temizle
  if (lastOperationWasEquals) {
    clearAll();
    lastOperationWasEquals = false;
  }

  // Nokta kontrolü - bir sayıda sadece bir nokta olabilir
  if (value === ".") {
    if (isWaitingANewValue) {
      if (afterNumber.includes(".")) return;
      if (afterNumber === "") afterNumber = "0";
    } else {
      if (firstNumber.includes(".")) return;
      if (firstNumber === "") firstNumber = "0";
    }
  }

  // Sayı ekleme
  if (isWaitingANewValue) {
    afterNumber += value;
  } else {
    firstNumber += value;
  }

  upDateResultPanel(value);
}

// Operatör işleme fonksiyonu
function handleOperator(operator) {
  lastOperationWasEquals = false;

  // Eğer hiç sayı girilmemişse operatör kabul etme
  if (firstNumber === "") return;

  // Eğer zaten bir işlem varsa ve ikinci sayı da girilmişse, önce hesapla
  if (firstNumber !== "" && afterNumber !== "" && selectOperator !== "") {
    calculate();
  }

  selectOperator = operator;
  isWaitingANewValue = true;
  displayEl.innerHTML = getCurrentNumber();
  twoDisplayPanel(operator);
}

// Eşittir işleme fonksiyonu
function handleEquals() {
  if (firstNumber !== "" && afterNumber !== "" && selectOperator !== "") {
    calculate();
    lastOperationWasEquals = true;
  }
}

function upDateResultPanel(value) {
  const currentNumber = getCurrentNumber();

  // Eğer ekranda sadece "0" varsa ve nokta değilse, 0'ı temizle
  if (displayEl.innerHTML === "0" && value !== ".") {
    displayEl.innerHTML = value;
  } else if (displayEl.innerHTML === "0" && value === ".") {
    displayEl.innerHTML = "0.";
  } else {
    displayEl.innerHTML = currentNumber;
  }
}

// Mevcut sayıyı al
function getCurrentNumber() {
  return isWaitingANewValue ? afterNumber : firstNumber;
}

function twoDisplayPanel(value) {
  // Operatör sembollerini Türkçe karşılıklarıyla göster
  const operatorSymbols = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷",
  };

  const displaySymbol = operatorSymbols[value] || value;
  displayElTwo.innerHTML = firstNumber + " " + displaySymbol;
}

// Hesaplama fonksiyonu
function calculate() {
  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(afterNumber);
  let result = 0;

  // Geçersiz sayı kontrolü
  if (isNaN(num1) || isNaN(num2)) {
    displayError("Geçersiz İşlem");
    return;
  }

  switch (selectOperator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        displayError("Sıfıra Bölünemez");
        return;
      }
      result = num1 / num2;
      break;
    default:
      return;
  }

  // Sonucu formatla (çok uzun ondalık sayıları kısalt)
  if (result.toString().length > 12) {
    result = parseFloat(result.toPrecision(10));
  }

  // Operatör sembollerini göster
  const operatorSymbols = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷",
  };

  // Sonucu göster
  displayEl.innerHTML = result.toString();
  displayElTwo.innerHTML =
    firstNumber +
    " " +
    operatorSymbols[selectOperator] +
    " " +
    afterNumber +
    " =";

  // Değişkenleri güncelle
  firstNumber = result.toString();
  afterNumber = "";
  selectOperator = "";
  isWaitingANewValue = false;
}

// Hata gösterme fonksiyonu
function displayError(message) {
  displayEl.innerHTML = message;
  displayElTwo.innerHTML = "";

  // 2 saniye sonra temizle
  setTimeout(() => {
    clearAll();
  }, 2000);
}

// Tümünü temizle fonksiyonu
function clearAll() {
  firstNumber = "";
  afterNumber = "";
  selectOperator = "";
  isWaitingANewValue = false;
  lastOperationWasEquals = false;
  displayEl.innerHTML = "0";
  displayElTwo.innerHTML = "";
}

// Geri silme fonksiyonu
function backspace() {
  // Eğer son işlem eşittir ise, geri silme yapma
  if (lastOperationWasEquals) return;

  if (isWaitingANewValue && afterNumber !== "") {
    afterNumber = afterNumber.slice(0, -1);
    displayEl.innerHTML = afterNumber || "0";
  } else if (!isWaitingANewValue && firstNumber !== "") {
    firstNumber = firstNumber.slice(0, -1);
    displayEl.innerHTML = firstNumber || "0";
  }
}

// Klavye desteği
function handleKeyboard(e) {
  const key = e.key;

  // Sayılar ve nokta
  if (/[0-9.]/.test(key)) {
    handleNumber(key);
  }
  // Operatörler
  else if (["+", "-", "*", "/"].includes(key)) {
    handleOperator(key);
  }
  // Eşittir (Enter veya =)
  else if (key === "Enter" || key === "=") {
    e.preventDefault();
    handleEquals();
  }
  // Temizle (Escape veya c)
  else if (key === "Escape" || key.toLowerCase() === "c") {
    clearAll();
  }
  // Geri silme (Backspace)
  else if (key === "Backspace") {
    e.preventDefault();
    backspace();
  }
}
