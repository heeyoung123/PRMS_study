function first() {
  console.log("첫번쨰");
}
function second() {
  console.log("두번쨰");
}
function third() {
  console.log("세번쨰");
}
first();
setTimeout(second, 2000);
third();
//:한명이 일을 하는데 요리를 순차적으로 진행 x, 중간 중간 비는 시간이 있다면 다른 요리를 함
//첫번째 이후 두번째가 실행되어야하지만 2초의 시간이 남음 그 빈 시간에 다음 함수는 third를 진행
