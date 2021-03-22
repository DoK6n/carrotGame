/**
 * carrot과 bug가 그려질 Field
 * 자바스크립트에서 클래스 내부에 등록된 멤버함수를 콜백함수로 전달할때 클래스의 정보는 전달되지 않음
 */
'use strict';

import * as sound from './sound.js';

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  // 출력할 아이템 수를 game class에서 전달받은 매개변수로 update
  setItemCount(stageItemCount) {
    this.carrotCount = stageItemCount;
    this.bugCount = stageItemCount;
  }

  init() {
    this.field.innerHTML = '';
    this.#addItem('carrot', this.carrotCount, 'img/carrot.png');
    this.#addItem('bug', this.bugCount, 'img/bug.png');
  }

  // game class로 부터 전달받은 클릭한 아이템(당근, 벌레)에 따라 동작하는 콜백함수
  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  // private로 선언한 아이템을 추가하는 함수
  #addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  // field click시 동작하는 콜백함수
  onClick = (event) => {
    const target = event.target;
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
