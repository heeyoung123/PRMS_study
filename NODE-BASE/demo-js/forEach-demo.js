// 배열

const arr = [1, 2, 3, 4, 5];

// 객체(또는 배열)에서 요소를 하나 꺼낸 다음 매개변수로 그 요소를 전달하여 호출되는 콜백함수

arr.forEach(function (a, b) {
  //   console.log(`a는 ${a}고 b는 ${b}이다.`);
});
//첫번재 값은 데이터(value)고 두번째 값은 인덱스(key), 세번째 값은 객체 통째로 반환한다.

//Map과 foreach
let map = new Map();
let index = 1;
map.set(index++, "heeyoung");
map.set(index++, "zeus");
map.set(index++, "viper");
map.forEach(function (a, b, c) {
  console.log(`id는 ${b}고 이름은 ${a}이고 마지막 값은 ${c}이다.`);
});
