/**
 * main에서 게임을 만들고,
 * 게임과 배너를 연결
 */
'use strict';

import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .gameDuration(5)
  .carrotCount(1)
  .bugCount(1)
  .build();

// 게임이 끝날때 상태에 따른 팝업메시지 변동하는 콜백함수를 인수로 전달
game.setGameStopListener((reason, icon, point) => {
  let message;
  const isForward = icon.classList.contains('fa-forward')
  switch (reason) {
    case Reason.cancel:
      isForward && icon.classList.remove('fa-forward');
      isForward && icon.classList.add('fa-redo');
      message = `Replay❓`;
      sound.playAlert();
      break;
    case Reason.win:
      !isForward && icon.classList.add('fa-forward');
      !isForward && icon.classList.remove('fa-redo');
      message = '🎊 Next Stage 🎊';
      sound.playWin();
      break;
    case Reason.lose:
      isForward && icon.classList.remove('fa-forward');
      isForward && icon.classList.add('fa-redo');
      message = `😥 ${point}점 😥`;
      sound.playBug();
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
