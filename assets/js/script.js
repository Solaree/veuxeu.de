class TypingText {
  constructor() {
    this.typedTextSpan = document.querySelector('.typed-text');
    this.cursorSpan = document.querySelector('.cursor');

    this.textArray = [
      'Who I am?', 
      '<img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python Logo" class="logo"> developer', 
      '<img src="https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg" alt="C Logo" class="logo"> developer',
      'I Use <img src="https://upload.wikimedia.org/wikipedia/commons/1/13/Arch_Linux_%22Crystal%22_icon.svg" alt="C Logo" class="logo"> Btw',
      '#teampixel'
    ];
    this.typingDelay = 45;
    this.erasingDelay = 45;
    this.newTextDelay = 350;
    this.textArrayIdx = 0;
    this.charIdx = 0;
  }

  type = () => {
    if (this.charIdx < this.textArray[this.textArrayIdx].length) {
      if (!this.cursorSpan.classList.contains('typing'))
        this.cursorSpan.classList.add('typing');
      const currentChar = this.textArray[this.textArrayIdx].charAt(this.charIdx);
      if (currentChar === '<') {
        const endIdx = this.textArray[this.textArrayIdx].indexOf('>', this.charIdx) + 1;
        this.typedTextSpan.innerHTML += this.textArray[this.textArrayIdx].substring(this.charIdx, endIdx);
        this.charIdx = endIdx;
      } else {
        this.typedTextSpan.innerHTML += currentChar;
        this.charIdx++;
      }
      setTimeout(this.type, this.typingDelay);
    } else {
      this.cursorSpan.classList.remove('typing');
      setTimeout(this.erase, this.newTextDelay);
    }
  }

  erase = () => {
    if (this.charIdx > 0) {
      if (!this.cursorSpan.classList.contains('typing'))
        this.cursorSpan.classList.add('typing');
      if (this.typedTextSpan.lastChild && this.typedTextSpan.lastChild.nodeName === 'IMG') {
        this.typedTextSpan.lastChild.remove();
        this.charIdx = this.textArray[this.textArrayIdx].lastIndexOf('<', this.charIdx);
      } else {
        this.typedTextSpan.innerHTML = this.textArray[this.textArrayIdx].substring(0, this.charIdx - 1);
        this.charIdx--;
      }
      setTimeout(this.erase, this.erasingDelay);
    } else {
      this.cursorSpan.classList.remove('typing');
      this.textArrayIdx++;
      if (this.textArrayIdx >= this.textArray.length) this.textArrayIdx = 0;
      setTimeout(this.type, this.typingDelay + 1100);
    }
  }

  start = () => {
    if (this.textArray.length)
      setTimeout(this.type, this.newTextDelay + 250);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const typingText = new TypingText();
  typingText.start();
});
