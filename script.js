const keyboard = document.createElement('div');
const textarea = document.createElement('textarea');

const engKeys = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
  ['Ctrl', 'Alt', ' ', 'Alt', 'Ctrl', '◄', '▼', '►']
];

const rusKeys = [
  ['Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift'],
  ['Ctrl', 'Alt', ' ', 'Alt', 'Ctrl', '◄', '▼', '►']
];

keyboard.classList.add('keyboard');
textarea.classList.add('textarea');

document.body.append(textarea, keyboard);

const generateKeyboard = (keys) => {
  keyboard.append(
    ...keys.map((keyRow) => {
      const row = document.createElement('div');
      row.classList.add('keyboard-row');
      row.append(
        ...keyRow.map((key) => {
          const keyboardKey = document.createElement('div');
          keyboardKey.classList.add('keyboard-key');
          keyboardKey.textContent = key;
          return keyboardKey;
        })
      );
      return row;
    })
  );
};

let currentLanguage = localStorage.getItem('language') || 'eng';

const toggleLanguage = () => {
  currentLanguage = currentLanguage === 'eng' ? 'rus' : 'eng';
  localStorage.setItem('language', currentLanguage);
  keyboard.innerHTML = '';
  currentLanguage === 'eng' ? generateKeyboard(engKeys) : generateKeyboard(rusKeys);
};

generateKeyboard(engKeys);
