const engKeys = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
  ['Ctrl', 'Alt', ' ', 'Alt', 'Ctrl', '◄', '▼', '►']
];

const rusKeys = [
  ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift'],
  ['Ctrl', 'Alt', ' ', 'Alt', 'Ctrl', '◄', '▼', '►']
];

// Создание виртуальной клавиатуры
const keyboard = document.createElement('div');
const textarea = document.createElement('textarea');

// Добавление классов для стилизации
keyboard.classList.add('keyboard');
textarea.classList.add('textarea');

// Переключение между языками клавиатуры по нажатию левых Ctrl и Alt
let isEng = localStorage.getItem('language') !== 'rus';
let ctrlPressed = false;
let altPressed = false;

document.addEventListener('keydown', (event) => {
  if (event.code === 'ControlLeft') ctrlPressed = true;
  else if (event.code === 'AltLeft') altPressed = true;

  if (ctrlPressed && altPressed) {
    isEng = !isEng;
    localStorage.setItem('language', isEng ? 'eng' : 'rus');
    renderKeys();
  }

  if (event.code === 'Tab') {
    event.preventDefault(); 
    handleTab(); 
  }
});


document.addEventListener('keyup', (event) => {
if (event.code === 'ControlLeft') ctrlPressed = false;
else if (event.code === 'AltLeft') altPressed = false;
});

window.addEventListener('load', () => {
isEng = localStorage.getItem('language') !== 'rus';
renderKeys();
});

// Функция для генерации кнопок клавиатуры
function renderKeys() {
  keyboard.innerHTML = '';
  const keys = isEng ? engKeys : rusKeys;

  function handleTab() {
    const textarea = document.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const spaces = '    '; // четыре пробела
    textarea.value = textarea.value.substring(0, start) + spaces + textarea.value.substring(end);
    textarea.selectionStart = start + spaces.length;
    textarea.selectionEnd = textarea.selectionStart;
    textarea.focus();
  }
  
  function handleBackspace() {
    const textarea = document.querySelector('.textarea');
    textarea.value = textarea.value.substring(0, textarea.value.length - 1);
  }  

  function handleSymbol(symbol) {
    if (symbol === 'Enter') return handleEnter();
    const lowerSymbol = symbol.toLowerCase();
    const inputSymbol = isEng ? lowerSymbol : (lowerSymbol === 'ъ' ? 'ь' : lowerSymbol);
    textarea.value += inputSymbol;
  }
  function handleEnter() {
    textarea.value += '\n';
  }
  
  keys.forEach(row => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    row.forEach(key => {
      if (key === 'Backspace') {
        const keyElement = document.createElement('button');
        keyElement.classList.add('key');
        keyElement.textContent = key;
        keyElement.addEventListener('click', handleBackspace);
        rowElement.appendChild(keyElement);
      } else {
        const keyElement = document.createElement('button');
        keyElement.classList.add('key');
        keyElement.textContent = key;
        if (key === 'Tab') {
          keyElement.addEventListener('keydown', event => {
            if (event.code === 'Tab') {
              event.preventDefault();
              handleTab();
            }
          });
                  
          keyElement.addEventListener('click', handleTab);
        }       
        else {
          keyElement.addEventListener('click', () => {
            const symbol = isEng ? key.toLowerCase() : (key === 'ъ' ? 'ь' : (key === 'Ъ' ? 'Ь' : key));
            handleSymbol(symbol);
          });
        }
        rowElement.appendChild(keyElement);
      }
    });
    keyboard.appendChild(rowElement);
  });
  
}
renderKeys();

// Добавление клавиатуры и текстовой области на страницу
document.body.appendChild(textarea);
document.body.appendChild(keyboard);
