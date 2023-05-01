"use strict";

const engKeys = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
  ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl']
];
const rusKeys = [
  ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift'],
  ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl']
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

// Переключение между языками клавиатуры по нажатию левых Ctrl и Alt
let isEng = localStorage.getItem('language') !== 'rus';
let ctrlPressed = false;
let altPressed = false;

window.addEventListener('load', () => {
  isEng = localStorage.getItem('language') !== 'rus';
  renderKeys();
});

// Функция для генерации кнопок клавиатуры
function renderKeys() {
  keyboard.innerHTML = '';
  const keys = isEng ? engKeys : rusKeys;
  let capsLock = false;
  let shiftPressed = false;

  const handleSymbol = (symbol) => {
    if (symbol === 'Enter') return handleEnter();
    if (symbol === 'Ctrl' || symbol === 'Win' || symbol === 'Alt') return;
    let inputSymbol = symbol.toLowerCase();
    if (capsLock || shiftPressed) {
      inputSymbol = symbol.toUpperCase();
      shiftPressed = false;
    }
    if (!isEng) {
      inputSymbol = (inputSymbol === 'ъ') ? 'ь' : inputSymbol;
    }
    textarea.value += inputSymbol;
    textarea.focus();
  };

  const handleEnter = () => {
    const cursorPosition = textarea.selectionStart;
    const value = textarea.value;
    const beforeCursor = value.substring(0, cursorPosition);
    const afterCursor = value.substring(cursorPosition);
    textarea.value = beforeCursor + '\n' + afterCursor;
    textarea.focus();
    textarea.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
  };

  const handleBackspace = () => {
    const textarea = document.querySelector('.textarea');
    textarea.focus();
    textarea.value = textarea.value.slice(0, -1);
  };

  const handleDel = () => {
    const cursorPosition = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorPosition) + textarea.value.slice(cursorPosition + 1);
    textarea.focus();
    textarea.setSelectionRange(cursorPosition, cursorPosition);
  };

  const handleShift = () => {
    shiftPressed = !shiftPressed;
    const keys = document.querySelectorAll('.key');
    keys.forEach((key) => {
      const keyText = key.getAttribute('data-key');
      if (keyText.length === 1) {
        const symbol = (capsLock || shiftPressed) ? keyText.toUpperCase() : keyText.toLowerCase();
        key.textContent = symbol;
      }
    });
  };

  const handleCapsLock = () => {
    capsLock = !capsLock;
    const keys = document.querySelectorAll('.key');
    keys.forEach((key) => {
      const keyText = key.getAttribute('data-key');
      if (keyText.length === 1) {
        const symbol = (capsLock || shiftPressed) ? keyText.toUpperCase() : keyText.toLowerCase();
        key.textContent = symbol;
      }
    });
  };

  const handleTab = (e) => {
    e.preventDefault();
    const cursorPosition = textarea.selectionStart;
    const value = textarea.value;
    const beforeCursor = value.substring(0, cursorPosition);
    const afterCursor = value.substring(cursorPosition);
    const updatedBeforeCursor = beforeCursor.replace(/(^|\n)([^\n]*)$/, `$1    $2`);
    textarea.value = updatedBeforeCursor + afterCursor;
    textarea.focus();
    textarea.setSelectionRange(cursorPosition + 4, cursorPosition + 4);
  };


  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      handleTab(e);
    }
  });

  function getArrowSymbol(key) {
    const arrowMap = {
      '◄': '←',
      '▼': '↓',
      '►': '→',
      '▲': '↑'
    };
    return arrowMap[key] || '';
  }

  function createKeyElement(key) {
    const keyElement = document.createElement('button');
    keyElement.classList.add('key');
    let keyText = key.toLowerCase();
    if (keyText.length === 1) {
      keyText = (capsLock || shiftPressed) ? keyText.toUpperCase() : keyText;
    }
    keyElement.textContent = keyText;
    keyElement.setAttribute('data-key', key.toLowerCase());
    if (key === 'Backspace') {
      keyElement.addEventListener('click', handleBackspace);
    } else if (key === 'Del') {
      keyElement.addEventListener('click', handleDel);
    } else if (key === 'Shift') {
      keyElement.addEventListener('click', handleShift);
    } else if (key === 'CapsLock') {
      keyElement.addEventListener('click', handleCapsLock);
    } else if (key === 'Tab') {
      keyElement.addEventListener('click', handleTab);
    } else if (['◄', '▼', '►', '▲'].includes(key)) {
      keyElement.addEventListener('click', () => {
        textarea.value += getArrowSymbol(key);
      });
    } else {
      keyElement.addEventListener('click', () => handleSymbol(key));
    }
    return keyElement;
  }
  
  keys.forEach((row) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    row.forEach((key) => {
      const keyElement = createKeyElement(key);
      rowElement.appendChild(keyElement);
    });
    keyboard.appendChild(rowElement);
  });
  
}

//Обработчик событий
let capsLockPressed = false;
let shiftPressed = false;

document.addEventListener('keydown', (event) => {
  const keyTextContent = event.key.toLowerCase();
  const keyElement = keyboard.querySelector(`.key:not(.special)[data-key="${keyTextContent}"]`);
  const shiftLeftElement = document.querySelector('.keyboard .row:nth-last-child(2) .key:first-child');
  const shiftRightElement = document.querySelector('.keyboard .row:nth-last-child(2) .key:last-child');
  const capsLockElement = document.querySelector('.keyboard [data-key="capslock"]');
  const altLeftElement = document.querySelector('.keyboard .row:last-child .key:nth-child(3)');
  const altRightElement = document.querySelector('.keyboard .row:last-child .key:nth-child(5)');
  const ctrlLeftElement = document.querySelector('.keyboard .row:last-child .key:first-child');
  const ctrlRightElement = document.querySelector('.keyboard .row:last-child .key:last-child');

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

  if (event.code === 'ShiftLeft') {
    shiftLeftElement.classList.add('active');
    shiftPressed = true;
    return;
  } else if (event.code === 'ShiftRight') {
    shiftRightElement.classList.add('active');
    shiftPressed = true;
    return;
  } else if (event.code === 'AltLeft') {
    altLeftElement.classList.add('active');
    altPressed = true;
    return;
  } else if (event.code === 'AltRight') {
    altRightElement.classList.add('active');
    altPressed = true;
    return;
  } else if (event.code === 'ControlLeft') {
    ctrlLeftElement.classList.add('active');
    ctrlPressed = true;
    return;
  } else if (event.code === 'ControlRight') {
    ctrlRightElement.classList.add('active');
    ctrlPressed = true;
    return;
  }

  if (event.code === 'CapsLock') {
    capsLockPressed = !capsLockPressed;
    capsLockElement.classList.toggle('active', capsLockPressed);
  }

  if (keyElement) {
    keyElement.classList.add('active');
  } else {
    handleSymbol(key);
  }
});

document.addEventListener('keyup', (event) => {
  const keyTextContent = event.key.toLowerCase();
  const keyElement = keyboard.querySelector(`.key:not(.special)[data-key="${keyTextContent}"]`);
  const shiftLeftElement = document.querySelector('.keyboard .row:nth-last-child(2) .key:first-child');
  const shiftRightElement = document.querySelector('.keyboard .row:nth-last-child(2) .key:last-child');
  const altLeftElement = document.querySelector('.keyboard .row:last-child .key:nth-child(3)');
  const altRightElement = document.querySelector('.keyboard .row:last-child .key:nth-child(5)');
  const ctrlLeftElement = document.querySelector('.keyboard .row:last-child .key:first-child');
  const ctrlRightElement = document.querySelector('.keyboard .row:last-child .key:last-child');

  if (event.code === 'ControlLeft') {
    ctrlPressed = false;
  } else if (event.code === 'AltLeft') {
    altPressed = false;
  }

  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    shiftLeftElement.classList.remove('active');
    shiftRightElement.classList.remove('active');
    shiftPressed = false;
    return;
  } else if (event.code === 'AltLeft' || event.code === 'AltRight') {
    altLeftElement.classList.remove('active');
    altRightElement.classList.remove('active');
    altPressed = false;
    return;
  } else if (event.code === 'CtrlLeft' || event.code === 'CtrlRight') {
    ctrlLeftElement.classList.remove('active');
    ctrlRightElement.classList.remove('active');
    ctrlPressed = false;
    return;
  }

  if (keyElement) {
    keyElement.classList.remove('active');
  }
});


renderKeys();