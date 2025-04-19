const display = document.getElementById('calculator-display');
const keysContainer = document.querySelector('.calculator-keys');

let valuePertama = '';
let operator = '';
let isNungguNextValue = false;

function calculate(angka1, op, angka2) {
  const n1 = parseFloat(angka1);
  const n2 = parseFloat(angka2);

  switch (op) {
    case '+':
      return n1 + n2;
    case '-':
      return n1 - n2;
    case '*':
      return n1 * n2;
    case '/':
      return n1 !== 0 ? n1 / n2 : 'Error';
    default:
      return n2;
  }
}

keysContainer.addEventListener('click', (event) => {
  const key = event.target;
  if (!key.matches('button')) {
    return;
  }

  const action = key.dataset.action;
  const value = key.dataset.value;

  if (!action && value !== undefined) {
    if (display.value === '0' || isNungguNextValue) {
      display.value = value;
      isNungguNextValue = false;
    } else {
      display.value += value;
    }
    console.log('Nomor:', value);
  }

  if (value === '.') {
    if (!display.value.includes('.') && !isNungguNextValue) {
      display.value += '.';
    } else if (isNungguNextValue) {
      display.value = '0.';
      isNungguNextValue = false;
    }
    console.log('Decimal');
  }
  if (['+', '-', '*', '/'].includes(value)) {
    if (operator && !isNungguNextValue) {
      const result = calculate(valuePertama, operator, display.value);
      display.value = String(result);
      valuePertama = String(result);
    } else {
      valuePertama = display.value;
    }
    operator = value;
    isNungguNextValue = true;
    console.log('Operator:', operator, 'Value pertama:', valuePertama);
  }

  if (action === 'clear') {
    display.value = '0';
    valuePertama = '';
    operator = '';
    isNungguNextValue = false;
    console.log('Cleared!');
  }

  if (action === 'del') {
    if (!isNungguNextValue) {
      display.value = display.value.slice(0, -1);
      if (display.value === '') {
        display.value = '0';
      }
    }
    console.log('Delete');
  }

  if (action === 'calculate') {
    if (valuePertama && operator && !isNungguNextValue) {
      const valueKedua = display.value;
      const result = calculate(valuePertama, operator, valueKedua);
      display.value = String(result);

      valuePertama = '';
      operator = '';
      isNungguNextValue = true;
      console.log(
        'Mengkalkulasi:',
        valuePertama,
        operator,
        valueKedua,
        '=',
        result
      );
    } else {
      console.log('Mengkalkulasi: Ga cukup operatornya');
    }
  }
});
