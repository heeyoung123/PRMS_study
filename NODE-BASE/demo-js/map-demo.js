//map 함수(메서드) vs foreach차이

const arr = [1, 2, 3, 4, 5];

const foreachArr = arr.forEach(function (a, b, c) {
  return a * 2;
});
const mapArr = arr.map(function (a, b, c) {
  return a * 2;
});

console.log(
  `foreach로 반환하면 ${foreachArr} 이고 map으로 반환하면  ${mapArr}`
);
//map으로는 새로운 배열을 반환할 수 있지만 forEach는 반환할수없다.
