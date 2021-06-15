console.log("안녕하세요");

// 비어있는 공백 배열 생성
let arr = [];
// 공백배열에 데이터 추가하기
arr.push("홍길동");
arr.push("이몽룡");
arr.push("성춘향");
// 배열 전체내용 확인하기
console.log(arr);
// 1번 요소에 담긴 데이터 확인하기
console.log(arr[1]);

// spread 연산자(...)
// ES6+ (ES6이상 버전) 에서 사용하는 배열과 관련된 연산자
let arrCopy = [...arr]; // arr 배열에 담겨있는 것을 하나씩 append하는 것을 한꺼번에 하는 것
// arrCopu = [arr[0], arr[1], arr[2]] 이렇게 펼쳐져있는걸 하나하나 할 필요  x
console.log("arrCopy", arrCopy);
