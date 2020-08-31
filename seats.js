'use strict';
let decisionButton = document.getElementById('decision-button');
let numberError = document.getElementById('number-error');
let condition = document.getElementById('condition');
let numberInput = document.getElementById('number-input');
let seatsDiv = document.getElementById('seats');
let resultSeat = document.getElementById('result');

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    // 子どもの要素があるかぎり削除
    element.removeChild(element.firstChild);
  }
}
/**
 * 飲み会のオブジェクト
 */
let drinking = {
  max: 24,
  min: 4,
  drinkingSelect: document.getElementById('drinking'),
  maleButton: document.getElementById('male-button'),
  femaleButton: document.getElementById('female-button'),
  userNameInput: document.getElementById('user-name'),
  balanceDiv: document.getElementById('balance'),
  drinkingLottery: document.getElementById('drinking-lottery'),
  drinkingLabel: document.getElementById('drinking-label'),
  shuffleTimer: document.getElementById('shuffle'),
  shuffleButton: document.getElementById('shuffle-button'),
  timerArea: document.getElementById('timer'),
  oneHour: document.getElementById('one-hour'),
  halfHour: document.getElementById('half-hour'),
  quarterHour: document.getElementById('quarter-hour'),
  testHour: document.getElementById('test-hour'),
  timerButton: document.getElementById('start-button'),
  typeOnClick: () => {
    //子要素があれば削除
    removeAllChildren(condition);
    removeAllChildren(numberError);
    // 件入力フォームで飲み会を選択した場合のオプションの表示非表示など
    drinking.balanceDiv.setAttribute('style', 'display: flex;');
    drinking.userNameInput.setAttribute('style', 'display: inline-block;');
    meeting.seatOption.setAttribute('style', 'display: none');
    meeting.meetingLabel.setAttribute('style', 'color: #999');
    drinking.drinkingLabel.setAttribute('style', 'color: #000');
    // 対応人数
    let minMax = `${drinking.min}人から${drinking.max}人まで対応しています。`;
    condition.innerText = minMax;
  },
  start: function (sameChecked, mostlyMaleChecked, mostlyFemaleChecked) {
    removeAllChildren(seatsDiv); //子要素があれば削除
    /** ランダムな数字の配列を入れる変数
     * @type {Array.<number>} ランダムな数字の配列
     */
    let randomArray = [];
    randomArray = []; // ランダムな数字の配列を空にする
    let maleArray = [];
    maleArray = []; // 男性の配列を空にする
    let femaleArray = [];
    femaleArray = []; // 女性の配列を空にする
    const totalNum = numberInput.value;

    /**
     * @type {Array.<object>} 参加メンバーの配列
     */
    let member = []; // member の配列を初期化する
    member = [
      { name: 'パンダ', fileName: 'panda.png' },
      { name: 'ネコ', fileName: 'cat.png' },
      { name: 'ウサギ', fileName: 'rabbit.png' },
      { name: 'ゾウ', fileName: 'elephant.png' },
      { name: 'トラ', fileName: 'tiger.png' },
      { name: 'ヒツジ', fileName: 'sheep.png' },
      { name: 'イヌ', fileName: 'dog.png' },
      { name: 'クマ', fileName: 'bear.png' },
      { name: 'ライオン', fileName: 'lion.png' },
      { name: 'ペンギン', fileName: 'pengin.png' },
      { name: 'コアラ', fileName: 'koala.png' },
      { name: 'ウマ', fileName: 'horse.png' },
      { name: 'カバ', fileName: 'kaba.png' },
      { name: 'アルパカ', fileName: 'alpaca.png' },
      { name: 'ゴリラ', fileName: 'gorilla.png' },
      { name: 'トナカイ', fileName: 'reindeer.png' },
      { name: 'シロクマ', fileName: 'white-bear.png' },
      { name: 'サル', fileName: 'monkey.png' },
      { name: 'キツネ', fileName: 'fox.png' },
      { name: 'アザラシ', fileName: 'seal.png' },
      { name: 'クジラ', fileName: 'whale.png' },
      { name: 'ブタ', fileName: 'pig.png' },
      { name: 'ネズミ', fileName: 'mouse.png' },
      { name: 'タヌキ', fileName: 'tanuki.png' },
    ];
    if (totalNum.length === 0) {
      // 参加人数が空の時はエラーを表示し処理を終了する
      numberError.innerText = '参加人数を入力してください。';
      // 抽選ボタンを非表示
      drinking.drinkingLottery.setAttribute('style', 'display: none');
      meeting.meetingLottery.setAttribute('style', 'display: none;');
      return;
    } else if (isNaN(totalNum)) {
      // 入力が数字でない場合にエラーを表示し処理を終了する
      numberError.innerText = '半角数字を入力してください。';
      // 抽選ボタンを非表示
      drinking.drinkingLottery.setAttribute('style', 'display: none');
      meeting.meetingLottery.setAttribute('style', 'display: none;');
      return;
    } else if (sameChecked && totalNum % 2 != 0) {
      numberError.innerText = '男女同数なので参加人数は偶数でなければいけません。';
      // 抽選ボタンを非表示
      drinking.drinkingLottery.setAttribute('style', 'display: none');
      meeting.meetingLottery.setAttribute('style', 'display: none;');
      return;
    } else {
      removeAllChildren(numberError);
    }

    // 対応人数以外の場合はエラーを表示
    if (totalNum < drinking.min) {
      numberError.innerText = `${totalNum}人には対応していません。${drinking.min}以上の数字を入力してください。`;
    } else if (totalNum > drinking.max) {
      numberError.innerText = `${totalNum}人には対応していません。${drinking.max}以下の数字を入力してください。`;
    } else if (sameChecked && totalNum % 2 != 0) {
      numberError.innerText = '参加人数は偶数でなければいけません。';
    }
    if (drinking.min <= totalNum && totalNum <= drinking.max) {
      // 抽選ボタンを表示
      drinking.drinkingLottery.setAttribute('style', 'display: block');
      // 会議・セミナーの抽選ボタンを非表示
      meeting.meetingLottery.setAttribute('style', 'display: none;');
      // 座席表を2段にするための style を追加
      let gridNum = Math.round(totalNum / 2);
      seatsDiv.setAttribute('style', 'grid-template-columns:repeat(' + gridNum + ', 120px); grid-template-rows:150px 150px');
      seatsDiv.removeAttribute('class'); // 会議・セミナーで座席表を作成した時に付く class を削除
      // 座席表のHTMLを作成
      for (let i = 0; i < totalNum; i++) {
        let createDiv = document.createElement('div');
        createDiv.id = `seat${i + 1}`;
        createDiv.innerText = i + 1;
        seatsDiv.appendChild(createDiv);
      }
    }
    // 男性ボタンをクリックしたら
    drinking.maleButton.onclick = () => {
      drinking.maleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member);
    };
    // 女性ボタンをクリックしたら
    drinking.femaleButton.onclick = () => {
      drinking.femaleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member);
    };
    //シャッフルボタンをクリックしたら
    drinking.shuffleButton.onclick = () => {
      drinking.shuffle(totalNum, maleArray, femaleArray, member);
    };
    //タイマーボタンをクリックしたら
    drinking.timerButton.onclick = () => {
      drinking.drinkingTimer();
    };
  },

  /**
   * 男性ボタンをクリックした時、席を決める関数
   * @param {Number} randomArray ランダムな数字を入れる配列
   * @param {number} totalNum 参加人数
   * @param {boolean} sameChecked 男女同数の場合
   * @param {boolean} mostlyMaleChecked 男性が多い場合
   * @param {boolean} mostlyFemaleChecked 女性が多い場合
   * @param {Array} maleArray 男性のランダムな数字の配列
   * @param {Array} member 参加メンバーの配列
   * @return {InnerHTML} 抽選で決められた席の HTML を作る関数を読み込む
   */
  maleBtnClick: function (randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member) {
    // 参加者の配列の長さがオプションの抽選条件を超えたら、以降の処理を無効にする
    if (randomArray.length == totalNum) {
      return;
    } else if (sameChecked && maleArray.length == totalNum / 2) {
      return;
    } else if (mostlyFemaleChecked && maleArray.length + 1 >= totalNum / 2) {
      return;
    } else if (sameChecked && maleArray.length != totalNum / 2) {
      // 男女同数なら男性の抽選は半数になるまで子要素を削除
      removeAllChildren(resultSeat);
    } else if (mostlyFemaleChecked && maleArray.length + 1 < totalNum / 2) {
      //女性が多いの場合で maleArray の長さが totalNum の半数より少なければ子要素を削除
      removeAllChildren(resultSeat);
    } else if (randomArray.length < totalNum && mostlyMaleChecked) {
      //男性が多いの場合で randomArray の長さが totalNum より少なければ子要素を削除
      removeAllChildren(resultSeat);
    }

    /**
     * 席の総数以下のランダムな数字を作る
     * @type {number} ランダムな数字
     */
    let randomNumber = Math.floor(Math.random() * totalNum) + 1;
    return drinking.malePushArray(randomArray, randomNumber, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member);
  },

  /** 配列 randomArray に randomNumber が重複していないかチェックする
   * @param {Number} randomArray ランダムな数字を入れる配列
   * @param {number} randomNumber ランダムな数字
   * @param {number} totalNum 参加人数
   * @param {boolean} sameChecked 男女同数の場合
   * @param {boolean} mostlyMaleChecked 男性が多い場合
   * @param {boolean} mostlyFemaleChecked 女性が多い場合
   * @param {Array} maleArray 男性のランダムな数字の配列
   * @param {Array} member 参加メンバーの配列
   * @return {boolean} 配列 randomArray にある値と重複していなければ false を返す
   */
  maleDoubleCheck: function (randomArray, randomNumber, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member) {
    for (let i = 0; i < randomArray.length; i++) {
      if (randomNumber == randomArray[i]) {
        drinking.maleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member);
        return true;
      }
    }
    return false;
  },

  /**
   * 男性が隣同士・正面同士にならないようにチェックをする
   * @param {Number} randomArray ランダムな数字を入れる配列
   * @param {number} randomNumber ランダムな数字
   * @param {number} totalNum 参加人数
   * @param {boolean} sameChecked 男女同数の場合
   * @param {boolean} mostlyMaleChecked 男性が多い場合
   * @param {boolean} mostlyFemaleChecked 女性が多い場合
   * @param {Array} maleArray 男性のランダムな数字の配列
   * @param {Array} member 参加メンバーの配列
   */
  maleNextToCheck: function (randomArray, randomNumber, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member) {
    if (mostlyFemaleChecked) {
      if (randomNumber % 2 !== 0 && totalNum % 4 === 1) {
        // 1 + 4n 人の場合、奇数番ならやり直し
        drinking.maleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member);
        return true;
      } else if (randomNumber % 2 !== 0 && randomNumber > Math.ceil(totalNum / 2) && totalNum % 4 === 3) {
        // 3 + 4n 人の場合、2列目が奇数番ならやり直し
        drinking.maleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member);
        return true;
      } else if (randomNumber % 2 !== 0 && randomNumber > Math.ceil(totalNum / 2) && totalNum % 4 === 0) {
        // 4n 人の場合、2列目が奇数番ならやり直し
        drinking.maleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member);
        return true;
      } else if (randomNumber % 2 === 0 && randomNumber > Math.ceil(totalNum / 2) && totalNum % 4 === 2) {
        // 2 + 4n 人の場合、2列目が偶数番ならやり直し
        drinking.maleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member);
        return true;
      } else if (randomNumber % 2 === 0 && randomNumber <= Math.ceil(totalNum / 2) && totalNum % 4 !== 1) {
        // 1列目が偶数番ならやり直し
        drinking.maleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member);
        return true;
      }
    } else {
      if (maleArray.length >= totalNum / 2 && mostlyMaleChecked) {
        // 半分以上の抽選が終わっていれば false を返しどこでも座れるようにする
        return false;
      } else if (randomNumber % 2 === 0 && totalNum % 4 === 1) {
        // 1 + 4n 人の場合、偶数番ならやり直し
        drinking.maleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member);
        return true;
      } else if (randomNumber % 2 === 0 && randomNumber > Math.ceil(totalNum / 2) && totalNum % 4 === 3) {
        // 3 + 4n 人の場合、2列目が偶数番ならやり直し
        drinking.maleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member);
        return true;
      } else if (randomNumber % 2 === 0 && randomNumber > Math.ceil(totalNum / 2) && totalNum % 4 === 0) {
        // 4n 人の場合、2列目が偶数番ならやり直し
        drinking.maleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member);
        return true;
      } else if (randomNumber % 2 !== 0 && randomNumber > Math.ceil(totalNum / 2) && totalNum % 4 === 2) {
        // 2 + 4n 人の場合、2列目が奇数番ならやり直し
        drinking.maleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member);
        return true;
      } else if (randomNumber % 2 !== 0 && randomNumber <= Math.ceil(totalNum / 2) && totalNum % 4 !== 1) {
        // 1列目が奇数番ならやり直し
        drinking.maleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member);
        return true;
      }
    }
    return false;
  },

  /**
   * 重複チェックが false なら数字を配列 randomArray に push し、席を確定する HTML を作る
   * @param {Number} randomArray ランダムな数字を入れる配列
   * @param {number} randomNumber ランダムな数字
   * @param {number} totalNum 参加人数
   * @param {boolean} sameChecked 男女同数の場合
   * @param {boolean} mostlyMaleChecked 男性が多い場合
   * @param {boolean} mostlyFemaleChecked 女性が多い場合
   * @param {Array} maleArray 男性のランダムな数字の配列
   * @param {Array} member 参加メンバーの配列
   */
  malePushArray: function (randomArray, randomNumber, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member) {
    if (
      !drinking.maleDoubleCheck(randomArray, randomNumber, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member) &&
      !drinking.maleNextToCheck(randomArray, randomNumber, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, maleArray, member)
    ) {
      //配列 randomArray に重複しないランダム数字を push する
      randomArray.push(randomNumber);

      // 男性だけの配列
      maleArray.push(randomNumber);

      /**
       * 座席表にあなたの席を表示する
       * 画像はイラストレインさんのを使用 https://illustrain.com/ 著作権法の問題はなし
       */
      let yourSeatNum = document.getElementById('seat' + randomNumber);
      let pathName = member[randomNumber - 1].name;
      let pathPic = member[randomNumber - 1].fileName;
      let userName = drinking.userNameInput.value;
      if (userName) {
        // 名前の入力があればオブジェクトの name を上書きする
        member[randomNumber - 1].name = userName;
        pathName = userName;
      }
      member[randomNumber - 1].sex = 'male'; //オブジェクトに sex を追加
      member[randomNumber - 1].number = randomNumber; //オブジェクトに number を追加

      // 座席表に表示する抽選された席の HTML を変数に代入
      let resultHtml = `
      <figure>
      <figcaption>${pathName}<span>くん</span></figcaption>
      <img src="./image/${pathPic}" alt="${pathName}" />
      </figure>
      <div>${randomNumber}</div>`;
      yourSeatNum.innerHTML = resultHtml; // 抽選された席に HTML を挿入

      // ヘッダーに抽選結果を表示（名前）
      let headerResultHeader = document.createElement('h3');
      if (userName) {
        headerResultHeader.innerText = `${pathName}くん、あなたの席は`;
      } else {
        headerResultHeader.innerText = `あなたは${pathName}くん、あなたの席は`;
      }
      resultSeat.appendChild(headerResultHeader);
      // ヘッダーに抽選結果を表示（ナンバー）
      let headerResult = document.createElement('div');
      headerResult.innerText = randomNumber;
      resultSeat.appendChild(headerResult);

      // class current を削除する
      for (let i = 1; i <= totalNum; i++) {
        let classDel = document.getElementById('seat' + i);
        classDel.classList.remove('current');
      }

      yourSeatNum.className = 'current seated-male'; // class を付与
      drinking.userNameInput.value = ''; // フォームに入力された値を空にする

      // すべての抽選が終わっtら抽選ボタンを消してタイマーとシャッフルを表示する
      if (randomArray.length == totalNum) {
        drinking.drinkingLottery.setAttribute('style', 'display: none');
        drinking.shuffleTimer.setAttribute('style', 'display: block');
      }
    }
    return;
  },

  /**
   * 女性ボタンをクリックした時、席を決める関数
   * @param {Number} randomArray ランダムな数字を入れる配列
   * @param {number} totalNum 参加人数
   * @param {boolean} sameChecked 男女同数の場合
   * @param {boolean} mostlyMaleChecked 男性が多い場合
   * @param {boolean} mostlyFemaleChecked 女性が多い場合
   * @param {Array} femaleArray 女性のランダムな数字の配列
   * @param {Array} member 参加メンバーの配列
   * @return {InnerHTML} 抽選で決められた席の HTML を作る関数を読み込む
   */
  femaleBtnClick: function (randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member) {
    // 参加者の配列の長さがオプションの抽選条件を超えたら、以降の処理を無効にする
    if (randomArray.length == totalNum) {
      return;
    } else if (sameChecked && femaleArray.length == totalNum / 2) {
      return;
    } else if (mostlyMaleChecked && femaleArray.length + 1 >= totalNum / 2) {
      return;
    } else if (sameChecked && femaleArray.length != totalNum / 2) {
      // 男女同数なら男性の抽選は半数になるまで子要素を削除
      removeAllChildren(resultSeat);
    } else if (mostlyMaleChecked && femaleArray.length + 1 < totalNum / 2) {
      //男性が多いの場合で maleArray の長さが totalNum の半数より少なければ子要素を削除
      removeAllChildren(resultSeat);
    } else if (randomArray.length < totalNum && mostlyFemaleChecked) {
      //女性が多いの場合で randomArray の長さが totalNum より少なければ子要素を削除
      removeAllChildren(resultSeat);
    }

    /**
     * 席の総数以下のランダムな数字を作る
     * @type {number} ランダムな数字
     */
    let randomNumber = Math.floor(Math.random() * totalNum) + 1;
    return drinking.femalePushArray(randomArray, randomNumber, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member);
  },

  /**
   * 配列 randomArray に randomNumber が重複していないかチェックする
   * @param {Number} randomArray ランダムな数字を入れる配列
   * @param {number} randomNumber ランダムな数字
   * @param {number} totalNum 参加人数
   * @param {boolean} sameChecked 男女同数の場合
   * @param {boolean} mostlyMaleChecked 男性が多い場合
   * @param {boolean} mostlyFemaleChecked 女性が多い場合
   * @param {Array} maleArray 男性のランダムな数字の配列
   * @param {Array} member 参加メンバーの配列
   * @return {boolean} 配列 randomArray にある値と重複していなければ false を返す
   */
  femaleDoubleCheck: function (randomArray, randomNumber, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member) {
    for (let i = 0; i < randomArray.length; i++) {
      if (randomNumber == randomArray[i]) {
        drinking.femaleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member);
        return true;
      }
    }
    return false;
  },

  /**
   * 女性が隣同士・正面同士にならないようにチェックをする
   * @param {Number} randomArray ランダムな数字を入れる配列
   * @param {number} randomNumber ランダムな数字
   * @param {number} totalNum 参加人数
   * @param {boolean} sameChecked 男女同数の場合
   * @param {boolean} mostlyMaleChecked 男性が多い場合
   * @param {boolean} mostlyFemaleChecked 女性が多い場合
   * @param {Array} femaleArray 女性のランダムな数字の配列
   * @param {Array} member 参加メンバーの配列
   */
  femaleNextToCheck: function (randomArray, randomNumber, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member) {
    if (mostlyFemaleChecked) {
      if (femaleArray.length >= totalNum / 2) {
        // 半分以上の抽選が終わっていれば false を返しどこでも座れるようにする
        return false;
      } else if (randomNumber % 2 === 0 && totalNum % 4 === 1) {
        // 1 + 4n 人の場合、2列目が偶数番ならやり直し
        drinking.femaleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member);
        return true;
      } else if (randomNumber % 2 === 0 && randomNumber > Math.ceil(totalNum / 2) && totalNum % 4 === 3) {
        // 3 + 4n 人の場合、2列目が偶数番ならやり直し
        drinking.femaleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member);
        return true;
      } else if (randomNumber % 2 === 0 && randomNumber > Math.ceil(totalNum / 2) && totalNum % 4 === 0) {
        // 4n 人の場合、2列目が偶数番ならやり直し
        drinking.femaleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member);
        return true;
      } else if (randomNumber % 2 !== 0 && randomNumber > Math.ceil(totalNum / 2) && totalNum % 4 === 2) {
        // 2 + 4n 人の場合、2列目が奇数番ならやり直し
        drinking.femaleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member);
        return true;
      } else if (randomNumber % 2 !== 0 && randomNumber <= Math.ceil(totalNum / 2) && totalNum % 4 !== 1) {
        // 1列目が偶数番ならやり直し
        drinking.femaleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member);
        return true;
      }
    } else {
      if (randomNumber % 2 !== 0 && totalNum % 4 === 1) {
        // 1 + 4n 人の場合、奇数番ならやり直し
        drinking.femaleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member);
        return true;
      } else if (randomNumber % 2 !== 0 && randomNumber > Math.ceil(totalNum / 2) && totalNum % 4 === 3) {
        // 3 + 4n 人の場合、2列目が奇数番ならやり直し
        drinking.femaleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member);
        return true;
      } else if (randomNumber % 2 !== 0 && randomNumber > Math.ceil(totalNum / 2) && totalNum % 4 === 0) {
        // 4n 人の場合、2列目が奇数番ならやり直し
        drinking.femaleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member);
        return true;
      } else if (randomNumber % 2 === 0 && randomNumber > Math.ceil(totalNum / 2) && totalNum % 4 === 2) {
        // 2 + 4n 人の場合、2列目が偶数番ならやり直し
        drinking.femaleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member);
        return true;
      } else if (randomNumber % 2 === 0 && randomNumber <= Math.ceil(totalNum / 2) && totalNum % 4 !== 1) {
        // 1列目が偶数番ならやり直し
        drinking.femaleBtnClick(randomArray, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member);
        return true;
      }
    }
    return false;
  },

  /**
   * 重複チェックが false なら数字を配列 randomArray に push し、席を確定する HTML を作る
   * @param {Number} randomArray ランダムな数字を入れる配列
   * @param {number} randomNumber ランダムな数字
   * @param {number} totalNum 参加人数
   * @param {boolean} sameChecked 男女同数の場合
   * @param {boolean} mostlyMaleChecked 男性が多い場合
   * @param {boolean} mostlyFemaleChecked 女性が多い場合
   * @param {Array} femaleArray 女性のランダムな数字の配列
   * @param {Array} member 参加メンバーの配列
   */
  femalePushArray: function (randomArray, randomNumber, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member) {
    if (
      !drinking.femaleDoubleCheck(randomArray, randomNumber, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member) &&
      !drinking.femaleNextToCheck(randomArray, randomNumber, totalNum, sameChecked, mostlyMaleChecked, mostlyFemaleChecked, femaleArray, member)
    ) {
      //配列 randomArray に重複しないランダム数字を push する
      randomArray.push(randomNumber);
      // 女性だけの配列
      femaleArray.push(randomNumber);
      /**
       * 座席表にあなたの席を表示する
       * 画像はイラストレインさんのを使用 https://illustrain.com/ 著作権法の問題はなし
       */
      let yourSeatNum = document.getElementById('seat' + randomNumber);
      let pathName = member[randomNumber - 1].name;
      let pathPic = member[randomNumber - 1].fileName;
      let userName = drinking.userNameInput.value;
      if (userName) {
        // 名前の入力があればオブジェクトの name を上書きする
        member[randomNumber - 1].name = userName;
        pathName = userName;
      }
      member[randomNumber - 1].sex = 'female'; //オブジェクトに sex を追加
      member[randomNumber - 1].number = randomNumber; //オブジェクトに number を追加

      // 座席表に表示する抽選された席の HTML を変数に代入
      let resultHtml = `
      <figure>
      <figcaption>${pathName}<span>さん</span></figcaption>
      <img src="./image/${pathPic}" alt="${pathName}" />
      </figure>
      <div>${randomNumber}</div>`;
      yourSeatNum.innerHTML = resultHtml; // 抽選された席に HTML を挿入

      // ヘッダーに抽選結果を表示（名前）
      let headerResultHeader = document.createElement('h3');
      if (userName) {
        headerResultHeader.innerText = `${pathName}さん、あなたの席は`;
      } else {
        headerResultHeader.innerText = `あなたは${pathName}さん、あなたの席は`;
      }
      resultSeat.appendChild(headerResultHeader);
      // ヘッダーに抽選結果を表示（ナンバー）
      let headerResult = document.createElement('div');
      headerResult.innerText = randomNumber;
      resultSeat.appendChild(headerResult);

      // class current を削除する
      for (let i = 1; i <= totalNum; i++) {
        let classDel = document.getElementById('seat' + i);
        classDel.classList.remove('current');
      }

      yourSeatNum.className = 'current seated-female'; // class を付与
      drinking.userNameInput.value = ''; // フォームに入力された値を空にする

      // すべての抽選が終わっtら抽選ボタンを消してタイマーとシャッフルを表示する
      if (randomArray.length == totalNum) {
        drinking.drinkingLottery.setAttribute('style', 'display: none');
        drinking.shuffleTimer.setAttribute('style', 'display: block');
      }
    }
    return;
  },

  /**
   * 全員の席が確定後に席をシャッフルする関数
   * @param {number} totalNum 参加人数
   * @param {Array} maleArray 男性のランダムな数字の配列
   * @param {Array} femaleArray 女性のランダムな数字の配列
   * @param {Array} member 参加メンバーの配列
   */
  shuffle: function (totalNum, maleArray, femaleArray, member) {
    // 座席表を削除
    removeAllChildren(seatsDiv);

    for (let i = maleArray.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [maleArray[i], maleArray[j]] = [maleArray[j], maleArray[i]];
    }
    for (let i = 0, k = 0; i < totalNum; i++) {
      if (member[i].sex == 'male') {
        member[i].id = `seat${maleArray[k++]}`;
      }
    }

    for (let i = femaleArray.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [femaleArray[i], femaleArray[j]] = [femaleArray[j], femaleArray[i]];
    }
    for (let i = 0, k = 0; i < totalNum; i++) {
      if (member[i].sex == 'female') {
        member[i].id = `seat${femaleArray[k++]}`;
      }
    }
    let count = 1;
    while (count <= totalNum) {
      for (let i = 0; i < totalNum; i++) {
        if (member[i].id == `seat${count}`) {
          // 座席表に表示するシャッフルされた席の HTML を変数に代入
          let honorific = null;
          if (member[i].sex == 'male') {
            honorific = 'くん';
          } else {
            honorific = 'さん';
          }
          let resultHtml = `
          <figure>
          <figcaption>${member[i].name}<span>${honorific}</span></figcaption>
          <img src="./image/${member[i].fileName}" alt="${member[i].name}" />
          </figure>
          <div>${member[i].number}</div>`;

          let newseat = document.createElement('div');
          newseat.insertAdjacentHTML('afterbegin', resultHtml);
          if (member[i].sex == 'male') {
            newseat.className = 'seated-male';
          } else {
            newseat.className = 'seated-female';
          }
          seatsDiv.appendChild(newseat); // シャッフルされた席に順次 HTML を挿入
        }
      }
      count++;
    }
  },

  /**
   * タイマーをスタートさせる関数
   * @return {number} カウントダウンタイマー
   */
  drinkingTimer: function () {
    let startTime = null;
    let nowTime = null;
    let setTime = null;
    let timer = null;
    let elapsedTime = null;
    let decimal = null;
    let sec = null;
    let min = null;
    let hour = null;
    drinking.timerButton.onclick = () => {
      clearInterval(timer);
      drinking.drinkingTimer();
    };
    startTime = Date.now();
    if (drinking.oneHour.checked) {
      setTime = drinking.oneHour.value;
    } else if (drinking.halfHour.checked) {
      setTime = drinking.halfHour.value;
    } else if (drinking.quarterHour.checked) {
      setTime = drinking.quarterHour.value;
    } else if (drinking.testHour.checked) {
      setTime = drinking.testHour.value;
    }
    timer = setInterval(function () {
      nowTime = Date.now();
      elapsedTime = nowTime - startTime; // 経過時間
      decimal = Math.floor(elapsedTime); // 何コンマ秒経過したか
      sec = Math.floor(elapsedTime / 1000); // 何秒経過したか
      min = Math.floor(sec / 60); // 何分経過したか
      if (sec < setTime * 60) {
        decimal = 999 - (decimal - sec * 1000);
        sec = 59 - (sec - min * 60);
        min = setTime - 1 - (min - hour * 60);

        let addZero2 = function (value) {
          if (value < 10) {
            value = '0' + value;
          }
          return value;
        };
        let addZero3 = function (value) {
          if (value < 100) {
            value = '0' + value;
          }
          return value;
        };
        decimal = addZero3(decimal); // 数字が2桁になるよう 0 表示で調整
        sec = addZero2(sec);
        min = addZero2(min);
        return (drinking.timerArea.innerText = `${min}:${sec}:${decimal}`);
      } else {
        clearInterval(timer);
        alert('席替えのお時間です！');
        return;
      }
    }, 10);
  },
};

/**
 * 会議・セミナーのオブジェクト
 */
let meeting = {
  max: 1000,
  min: 2,
  meetingSelect: document.getElementById('meeting'),
  meetingLotteryButton: document.getElementById('meeting-lottery-button'),
  seatOption: document.getElementById('seat-option'),
  rowSeatInput: document.getElementById('row-seat'),
  meetingLottery: document.getElementById('meeting-lottery'),
  meetingLabel: document.getElementById('meeting-label'),
  socialDistanceSelect: document.getElementById('social-distance'),
  typeOnClick: () => {
    //子要素があれば削除
    removeAllChildren(condition);
    removeAllChildren(numberError);
    // 条件入力フォームで会議・セミナーを選択した場合のオプションの表示非表示など
    drinking.balanceDiv.setAttribute('style', 'display: none;');
    drinking.userNameInput.setAttribute('style', 'display: none;');
    meeting.seatOption.setAttribute('style', 'display: flex');
    drinking.drinkingLabel.setAttribute('style', 'color: #999');
    meeting.meetingLabel.setAttribute('style', 'color: #000');
    let minMax = `${meeting.min}人から${meeting.max}人まで対応しています。`;
    condition.innerText = minMax;

    // ソーシャルディスタンスにチェックが入っている時の対応人数
    let minMaxsocialDistance = `${meeting.min}人から${meeting.max / 2}人まで対応しています。`;
    if (meeting.socialDistanceSelect.checked) {
      condition.innerText = minMaxsocialDistance;
    }
    meeting.socialDistanceSelect.onclick = () => {
      if (meeting.socialDistanceSelect.checked) {
        condition.innerText = minMaxsocialDistance;
      } else {
        condition.innerText = minMax;
      }
    };
  },

  start: function () {
    removeAllChildren(seatsDiv); //子要素があれば削除
    /**
     * ランダムな数字の配列を入れる変数
     * @type {Array.<number>} ランダムな数字の配列
     */
    let randomArray = [];
    randomArray = []; //ランダムな数字の配列を空にする
    let totalNum = numberInput.value;

    if (totalNum.length === 0) {
      // 参加人数が空の時はエラーを表示し処理を終了する
      numberError.innerText = '参加人数を入力してください。';
      return;
    }
    if (isNaN(totalNum)) {
      // 入力が数字でない場合にエラーを表示し処理を終了する
      numberError.innerText = '半角数字を入力してください。';
      return;
    } else {
      removeAllChildren(numberError);
    }

    let socialDistanceChecked = meeting.socialDistanceSelect.checked;
    // 対応人数以外の場合はエラーを表示
    if (socialDistanceChecked && totalNum > meeting.max / 2) {
      numberError.innerText = `${totalNum}人には対応していません。${meeting.max / 2}以下の数字を入力してください。`;
    } else if (totalNum < meeting.min) {
      numberError.innerText = `${totalNum}人には対応していません。${meeting.min}以上の数字を入力してください。`;
    } else if (totalNum > meeting.max) {
      numberError.innerText = `${totalNum}人には対応していません。${meeting.max}以下の数字を入力してください。`;
    }
    let rowSeatValue = meeting.rowSeatInput.value; // 列(横)の数

    if (rowSeatValue == 0) {
      // 列(横)の値がなければエラーを表示
      numberError.innerText = '列(横)を入力してください';
    }
    if (meeting.min <= totalNum && totalNum <= meeting.max && rowSeatValue != 0) {
      if (socialDistanceChecked && totalNum > meeting.max / 2) {
        // ソーシャルディスタンスの対応人数を超えたら処理を終了
        return;
      } else {
        meeting.meetingLottery.setAttribute('style', 'display: flex;'); // 抽選ボタンを表示
        drinking.drinkingLottery.setAttribute('style', 'display: none'); // 飲み会の抽選ボタンを非表示

        // Social Distance にチェックがあれば totalNum と rowSeatValue を倍にする
        if (socialDistanceChecked) {
          totalNum = totalNum * 2;
          rowSeatValue = rowSeatValue * 2;
        }

        // 座席表のHTMLを作成
        seatsDiv.className = 'meeting';
        let columnSeatValue = Math.ceil(totalNum / rowSeatValue); // 行(縦)の数
        for (let i = 1; i <= totalNum; i++) {
          let createDiv = document.createElement('div');
          createDiv.id = `seat${i}`;
          createDiv.innerText = i;
          seatsDiv.appendChild(createDiv);
          if (i % 2 === 0 && socialDistanceChecked) {
            // 偶数番号にクラス名 social-distance を付与
            createDiv.className = 'social-distance';
          }
          if (rowSeatValue % 2 === 0 && socialDistanceChecked) {
            // 列(横)が偶数の時、偶数行(縦)のクラス名 social-distance を付与する箇所を調整する
            for (let j = 1; j < columnSeatValue + 1; j = j + 2) {
              let k = rowSeatValue * j + 1;
              let m = rowSeatValue * (j + 1);
              for (let n = k; n <= m; n++) {
                if (createDiv.innerText == n && n % 2 === 0) {
                  createDiv.classList.remove('social-distance');
                } else if (createDiv.innerText == n && n % 2 !== 0) {
                  createDiv.className = 'social-distance';
                }
              }
            }
          }
        }
        // 列(横)の席を折り返す場所の CSS を追加
        seatsDiv.setAttribute('style', 'grid-template-columns:repeat(' + rowSeatValue + ', minmax(30px, 120px));');
        if (rowSeatValue > 40) {
          seatsDiv.className = 'meeting over-columns40';
          seatsDiv.setAttribute('style', 'grid-template-columns:repeat(' + rowSeatValue + ', minmax(30px, 120px)); grid-gap: 10px 5px;');
        } else if (rowSeatValue > 30) {
          seatsDiv.className = 'meeting over-columns30';
          seatsDiv.setAttribute('style', 'grid-template-columns:repeat(' + rowSeatValue + ', minmax(30px, 120px)); grid-gap: 10px;');
        } else if (rowSeatValue > 25) {
          seatsDiv.className = 'meeting over-columns25';
        }
      }
      //抽選ボタンをクリックしたら
      meeting.meetingLotteryButton.onclick = () => {
        // randomArray の配列の長さが参加人数と同じになったら、以降の処理を無効にする
        if (socialDistanceChecked && randomArray.length == totalNum / 2) {
          return;
        } else if (randomArray.length == totalNum) {
          return;
        }
        meeting.LotteryBtnClick(randomArray, totalNum);
      };
    }
  },
  /**
   * @param {Number} randomArray ランダムな数字を入れる配列
   * @param {number} totalNum 参加人数
   */
  LotteryBtnClick: function (randomArray, totalNum) {
    if (randomArray.length != totalNum) {
      // randomArray の長さが totalNum 以下なら子要素を削除
      removeAllChildren(resultSeat);
    }

    /**
     * 席の総数以下のランダムな数字を作る
     * @type {number} ランダムな数字
     */
    let randomNumber = Math.floor(Math.random() * totalNum) + 1;
    return meeting.pushArray(randomArray, randomNumber, totalNum);
  },

  /**
   * 配列 randomArray に randomNumber が重複していないかチェックする
   * @param {Number} randomArray ランダムな数字を入れる配列
   * @param {number} randomNumber ランダムな数字
   * @param {number} totalNum 参加人数
   * @return {boolean} 配列 randomArray にある値と重複していなければ false を返す
   */
  doubleCheck: function (randomArray, randomNumber, totalNum) {
    for (let i = 0; i < randomArray.length; i++) {
      if (randomNumber == randomArray[i]) {
        meeting.LotteryBtnClick(randomArray, totalNum);
        return true;
      }
    }
    return false;
  },

  /**
   * ソーシャルディスタンス用に空けてある席かをチェックする
   * @param {Number} randomArray ランダムな数字を入れる配列
   * @param {number} randomNumber ランダムな数字
   * @param {number} totalNum 参加人数
   * @return {boolean} ソーシャルディスタンス用の席でなければ false を返す
   */
  socialCheck: function (randomArray, randomNumber, totalNum) {
    /**
     * @type {className} ソーシャルディスタンス用の席に付与するクラス名
     */
    let yourSeatNumClass = document.getElementById(`seat${randomNumber}`).className;
    if (yourSeatNumClass == 'social-distance') {
      {
        meeting.LotteryBtnClick(randomArray, totalNum);
        return true;
      }
    }
    return false;
  },

  /**
   * 重複チェックが false なら数字を配列 randomArray に push する
   * @param {Number} randomArray ランダムな数字を入れる配列
   * @param {number} randomNumber ランダムな数字
   * @param {number} totalNum 参加人数
   */
  pushArray: function (randomArray, randomNumber, totalNum) {
    if (!meeting.doubleCheck(randomArray, randomNumber, totalNum) && !meeting.socialCheck(randomArray, randomNumber, totalNum)) {
      //配列 randomArray に重複しないランダム数字を push する
      randomArray.push(randomNumber);

      let yourSeatNum = document.getElementById(`seat${randomNumber}`);

      // 座席表に表示する抽選された席の HTML を変数に代入
      let resultHtml = randomNumber;
      yourSeatNum.innerText = resultHtml; // 抽選された席に HTML を挿入

      // ヘッダーに抽選結果を表示（名前）
      let headerResultHeader = document.createElement('h3');
      headerResultHeader.innerText = 'あなたの席は';
      resultSeat.appendChild(headerResultHeader);
      // ヘッダーに抽選結果を表示（ナンバー）
      let headerResult = document.createElement('div');
      headerResult.innerText = randomNumber;
      resultSeat.appendChild(headerResult);
      if (totalNum > 99) {
        headerResult.setAttribute('style', 'width: 360px;');
      }

      // class current を削除する
      for (let i = 1; i <= totalNum; i++) {
        let classDel = document.getElementById('seat' + i);
        classDel.classList.remove('current');
      }
      yourSeatNum.className = 'current seated'; // class を付与
    }
    return;
  },
};

/**
 * 飲み会のラジオボタンが選択された場合
 * @return {string} 飲み会の対応人数とオプションの表示非表示
 */
drinking.drinkingSelect.onclick = () => {
  drinking.typeOnClick();
};
/**
 * 会議・セミナーのラジオボタンが選択された場合
 * @return {string} 会議・セミナーの対応人数とオプションの表示非表示
 */
meeting.meetingSelect.onclick = () => {
  meeting.typeOnClick();
};

/**
 * 席抽選を開始する関数
 * @param {boolean} sameChecked 男女同数の場合
 * @param {boolean} mostlyMaleChecked 男性が多い場合
 * @param {boolean} mostlyFemaleChecked 女性が多い場合
 */
function decision() {
  let sameChecked = document.getElementById('same').checked;
  let mostlyMaleChecked = document.getElementById('mostly-male').checked;
  let mostlyFemaleChecked = document.getElementById('mostly-female').checked;
  removeAllChildren(resultSeat);
  drinking.shuffleTimer.setAttribute('style', 'display: none;');
  if (drinking.drinkingSelect.checked) {
    drinking.start(sameChecked, mostlyMaleChecked, mostlyFemaleChecked);
  } else if (meeting.meetingSelect.checked) {
    meeting.start();
  } else {
    numberError.innerText = '↓の「飲み会」or「会議・セミナー」にチェックを入れてください。';
  }
}

/**
 * 決定ボタンをクリックしたら
 */
decisionButton.onclick = () => {
  decision();
  /**
   * ご操作防止用
   * 席決め抽選が開始されてから「人数決定」ボタンをクリックした時に、内容がリセットされることを確認する
   */
  decisionButton.onclick = () => {
    if (confirm('リセットされますがよろしいですか？')) {
      decision();
    }
  };
};
