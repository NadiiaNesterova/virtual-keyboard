
const engKeys = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
  ['Ctrl','Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl']
];

const rusKeys = [
  ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift'],
  ['Ctrl','Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl']
];


// Создание виртуальной клавиатуры
const keyboard = document.createElement('div');
const textarea = document.createElement('textarea');

const keyboardTextTitle = document.createElement('p');
keyboardTextTitle.textContent = 'Виртуальная клавиатура';
const keyboardTextDescription = document.createElement('p');
keyboardTextDescription.textContent = 'Клавиатура создана в операционной системе macOS';
const keyboardTextLanguage = document.createElement('p');
keyboardTextLanguage.textContent = 'Для переключения языка комбинация: левые Ctrl + Alt';

// Вставка элементов в DOM
document.body.classList.add('body');
document.body.append(
  keyboardTextTitle,
  textarea,
  keyboard,
  keyboardTextDescription,
  keyboardTextLanguage
);

// Добавление классов для стилизации
keyboard.classList.add('keyboard');
textarea.classList.add('textarea');
keyboardTextTitle.classList.add('keyboardTextTitle');
keyboardTextDescription.classList.add('keyboardTextDescription');
keyboardTextLanguage.classList.add('keyboardTextLanguage');

window.onload = function () {
  textarea.focus();
};
// Функция для генерации кнопок клавиатуры
function renderKeys() {
  keyboard.innerHTML = '';
  const keys = isEng ? engKeys : rusKeys;

  const handleSymbol = (symbol) => {
    if (symbol === 'Enter') return handleEnter();
    const lowerSymbol = symbol.toLowerCase();
    const inputSymbol = isEng ? lowerSymbol : (lowerSymbol === 'ъ' ? 'ь' : lowerSymbol);
    textarea.value += inputSymbol;
  };

  const handleBackspace = () => {
    const textarea = document.querySelector('.textarea');
    textarea.value = textarea.value.slice(0, -1);
  };

  keys.forEach((row) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    row.forEach((key) => {
      const keyElement = document.createElement('button');
      keyElement.classList.add('key');
      keyElement.textContent = key.toLowerCase();
      keyElement.setAttribute('data-key', key.toLowerCase());
      if (key === 'Backspace') {
        keyElement.addEventListener('click', handleBackspace);
      } else {
        keyElement.addEventListener('click', () => handleSymbol(key));
      }
      rowElement.appendChild(keyElement);
    });
    keyboard.appendChild(rowElement);
});

}


// Переключение между языками клавиатуры по нажатию левых Ctrl и Alt
let isEng = localStorage.getItem('language') !== 'rus';
let ctrlPressed = false;
let altPressed = false;

window.addEventListener('load', () => {
  isEng = localStorage.getItem('language') !== 'rus';
  renderKeys();
});

//
document.addEventListener('keydown', (event) => {
  const keyTextContent = event.key.toLowerCase();
  const keyElement = keyboard.querySelector(`.key:not(.special)[data-key="${keyTextContent}"]`);

  if (keyElement) {
    keyElement.classList.add('active');
  }

  if (event.code === 'ControlLeft') {
    ctrlPressed = true;
  } else if (event.code === 'AltLeft') {
    altPressed = true;
  }

  if (ctrlPressed && altPressed) {
    isEng = !isEng;
    localStorage.setItem('language', isEng ? 'eng' : 'rus');
    renderKeys();
  }
});

document.addEventListener('keyup', (event) => {
  const keyTextContent = event.key.toLowerCase();
  const keyElement = keyboard.querySelector(`.key:not(.special)[data-key="${keyTextContent}"]`);

  if (keyElement) {
    keyElement.classList.remove('active');
  }

  if (event.code === 'ControlLeft') {
    ctrlPressed = false;
  } else if (event.code === 'AltLeft') {
    altPressed = false;
  }
});


renderKeys();