// Получение ссылок на HTML-элементы с помощью их идентификаторов
const btn = document.querySelector("#loan-btn");
const amountInput = document.querySelector("#loan-amount");
const precentInput = document.querySelector("#loan-precent");
const termInput = document.querySelector("#loan-term");

const paymentOut = document.querySelector("#loan-payment");
const overOut = document.querySelector("#loan-over");
const totalOut = document.querySelector("#loan-total");
const chart = document.querySelector("#loan-chart");

// Функция для округления числа до двух десятичных знаков
function numRound(num) {
  let roundedNumber = Number(num.toFixed(2));
  return roundedNumber;
}

// Начальные значения для суммы, процентной ставки и срока кредита
const defaultOption = {
  amount: 0,
  precent: 0,
  term: 0,
};

// Установка начальных значений в поля ввода
amountInput.value = defaultOption.amount;
precentInput.value = defaultOption.precent;
termInput.value = defaultOption.term;

// Класс Loan для расчета кредита
class Loan {
  option = {};
  result = {};
  constructor(option) {
    this.option = option;
    this.calculate(); // Вызов метода calculate() при создании экземпляра класса
  }
  // Установка суммы, процентной ставки и срока кредита
  set amount(num) {
    this.option.amount = Number(num);
  }
  set precent(num) {
    this.option.precent = Number(num);
  }
  set term(num) {
    this.option.term = Number(num);
  }
  // Получение ежемесячного платежа, общей суммы и суммы переплаты
  get monthlyPayment() {
    return numRound(this.result.monthlyPayment);
  }
  get total() {
    return numRound(this.result.total);
  }
  get over() {
    return numRound(this.result.over);
  }
  // Расчет кредита
  calculate() {
    const monthlyPrecent = this.option.precent / (12 * 100);
    this.result.monthlyPayment =
      (this.option.amount * monthlyPrecent) /
      (1 - Math.pow(1 + monthlyPrecent, -this.option.term));
    this.result.total = this.result.monthlyPayment * this.option.term;
    this.result.over = this.result.total - this.option.amount;
    this.update(); // Вызов метода update() для обновления данных на странице
  }
  // Обновление данных на странице
  update() {
    paymentOut.textContent = this.monthlyPayment;
    overOut.textContent = this.over;
    totalOut.textContent = this.total;
  }
}

// Создание объекта myLoan класса Loan с начальными значениями
const myLoan = new Loan(defaultOption);

// Обработчик события для кнопки "Рассчитать"
btn.addEventListener("click", (e) => {
  e.preventDefault();
  // Обновление значений кредита и расчет новых данных
  myLoan.amount = amountInput.value;
  myLoan.precent = precentInput.value;
  myLoan.term = termInput.value;
  myLoan.calculate();
  // Обновление данных на графике
  myChart.data.datasets[0].data[0] = myLoan.option.amount;
  myChart.data.datasets[0].data[1] = myLoan.over;
  myChart.update();
});


