/**
 * 빌더패턴을 이용해서 게임을 생성
 */
'use strict';

import { Field, ItemType } from './field.js';
import * as sound from './sound.js';

const INIT_NUM = 1;
const INIT_DURATION = 5;

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

// Builder Pattern
export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }
  carrotCount(num) {
    this.carrotCount = num;
    return this;
  }
  bugCount(num) {
    this.bugCount = num;
    return this;
  }
  build() {
    return new Game(this.gameDuration, this.carrotCount, this.bugCount);
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.level = INIT_NUM;
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameBtn = document.querySelector('.game__button');
    this.gamePoint = document.querySelector('.game__point');
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.refreshBtn = document.querySelector('.pop-up__refresh');

    // game start button add click event
    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop(Reason.cancel, this.gamePoint.innerText);
      } else {
        this.start();
      }
    });

    this.started = false;
    this.score = 0;
    this.point = 0;
    this.timer = undefined;

    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setClickListener(this.onItemClick);
  }

  // 게임이 끝날때 상태에 따른 팝업메시지 변동하는 콜백함수를 프로퍼티에 등록
  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  // setting of next stage
  nextStage() {
    this.level++;
    this.carrotCount = this.carrotCount + this.level;
    this.bugCount = this.bugCount + this.level;
    this.gameDuration++;
  }

  // Stage Initialization
  initStage() {
    this.level = INIT_NUM;
    this.carrotCount = INIT_NUM;
    this.bugCount = INIT_NUM;
    this.gameDuration = INIT_DURATION;
    this.gameField.setItemCount(INIT_NUM);
    this.point = 0;
    this.updatePointBoard();
  }

  // Action at game start
  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  // Action at game stop
  stop(reason, point) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBackground();
    
    if (reason === Reason.cancel) this.initStage();
    const icon = this.refreshBtn.querySelector('.fas');
    this.onGameStop && this.onGameStop(reason, icon, point);
  }

  // 클릭한 아이템(당근, 벌레)에 따라 동작하는 콜백함수
  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();
      this.point++;
      this.updatePointBoard();
      if (this.score === this.carrotCount) {
        this.stop(Reason.win, this.gamePoint.innerText);
        this.nextStage();
        this.gameField.setItemCount(this.carrotCount);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose, this.gamePoint.innerText);
      this.initStage();
      this.gameField.setItemCount(this.level);
    }
  };

  showStopButton() {
    const icon = this.gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.gameBtn.style.visibility = 'visible';
  }

  hideGameButton() {
    this.gameBtn.style.visibility = 'hidden';
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }

  // 게임 시간
  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(this.score === this.carrotCount ? Reason.win : Reason.lose, this.gamePoint.innerText);
        this.initStage();
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  // stop the setInterval
  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerHTML = `${minutes}:${seconds}`;
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }

  // 남은 carrot
  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }

  // 얻은 점수
  updatePointBoard() {
    this.gamePoint.innerText = this.point;
  }
}
