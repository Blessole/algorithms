# Cyclic Rotation

## 문제 설명
- **출처**: Codility
- **난이도**: Easy
- **링크**: https://app.codility.com/programmers/lessons/2-arrays/cyclic_rotation/
- **문제유형**: Prefix sums (누적합)

[문제 요약]
> [!NOTE]
> 배열을 P 위치에서 두 부분으로 나눴을 때, 두 부분의 합 차이가 최소인 값 찾기


## 내 풀이

### 내 접근 방법
- 전체 합을 구하고, 왼쪽 값을 0부터 시작해서, 배열 하나씩 늘리면서 값을 더해가고,
- 오른쪽 값은 전체합에서 왼쪽값을 뺀 결과를 절대값으로 반환
- for문을 돌기 때문에 그냥 그 안에서 최소값을 업데이트하면서 계산하기!

### 내 코드
```js
function solution(A) {
    const total = A.reduce((a,b) => a+b);
    let left = 0;
    let min = Infinity;

    for (let i=1; i<A.length; i++) {
        left += A[i-1];
        let right = total - left;
        min = Math.min(min, Math.abs(left-right));
    }
    return min;
}
```

## 기억할 점!
- min = Infinity
- 절댓값 구하는 방법 : Math.abs(num)
- for문 인덱스 잘 생각해야 해!

### reduce
배열의 모든 요소를 하나의 값으로 줄이는 메소드 (더하기, 곱하기, 최댓값 등 다양하게 활용 가능)
```js
배열.reduce((누적값, 현재값) => {
  // 누적값에 현재값을 더하거나 처리
  return 새로운누적값;
}, 초기값);
```
#### 예시
```js
// 초기값 없음 (첫 요소가 초기값)
[3, 1, 2].reduce((a, b) => a + b)
// a=3부터 시작

// 초기값 있음 (0부터 시작)
[3, 1, 2].reduce((a, b) => a + b, 0)
// a=0부터 시작
```