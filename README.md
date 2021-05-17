![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/DoK6n/carrotgame)
# 당근 뽑기 게임
---

<br>

## ❗️ 프로젝트 소개

- 벌레를 피해 당근을 뽑는 게임 - _드림코딩엘리 강의에서 진행한 프로젝트_
- 함수형으로 직접 구현 후 강의 내용인 class로 리팩토링

<br>

## ❗️ 프로젝트 기간

- 2021.03.17 ~ 2021.03.22 (1인)

<br>

## ❗️ 사용된 기술

<br>

- HTML
- CSS
- Javascript (Vanilla js)
    - Class
    
<br>

## ❗️ 구현

<br>

### 1.  Object.freeze

<br>

- 객체를 동결시켜 변경되지 않게 만듬

```javascript

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});
	
```

comment

<br>

### 2.  빌더 패턴

<br>

- comment

```javascript

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
  ...  
}

// main.js

...

const game = new GameBuilder()
  .gameDuration(5)
  .carrotCount(1)
  .bugCount(1)
  .build();
  
...
	
```

comment

## ❗️ 링크

<br>

[당근 뽑으러 가기](https://dok6n.github.io/carrotgame/)

<br>

## ❗️ 만들면서 재밌었던 점

<br>

### 리팩토링

<br>

처음엔 구현을 목표로 하여 js파일 한 곳에 함수형식으로 직접 코딩하였고,
이 후 강의를 들으며 진행한 class를 사용하여
사운드들과 당근과 벌레가 출력되는 게임필드, 게임, 팝업, 빌더패턴 적용 등
기능별로 나누는 리팩토링 과정이 재미있었습니다.
강의 내용 부분인 리팩토링 과정 이후
직접 스테이지 레벨, 점수 기능을 추가해보았습니다.
처음 설계할 때 재사용성, 최적화, 구조와 같은 부분들을 고민하며
개발해야겠다고 생각하게 되었습니다.
