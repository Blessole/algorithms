# Max Counters

## 문제 설명
- **출처**: Codility
- **난이도**: Medium
- **링크**: https://app.codility.com/programmers/lessons/4-counting_elements/max_counters/
- **문제유형**: 지연 업데이트

[문제 요약]
> [!NOTE]
> N개의 카운터가 있음 (초기값 모두 0)
배열 A의 각 값에 대해:
1 ≤ A[K] ≤ N → A[K]번 카운터를 +1
A[K] = N+1 → 모든 카운터를 현재 최댓값으로 설정
최종 카운터 배열 반환

## 풀이
- max counter를 만나면, 즉시 fill하지말고, 기록만 해두었다가, 마지막에 한번에 업데이트 하기.
- 대신, 그 후에 max counter 보다 더 올려야하는 경우가 있을 수 있으니, 
  증가가 필요할 경우 lastUpdate보다 작은지 확인해서 미리 lastUpdate로 올리고 하나 더 추가로 올리기

```js
function solution(N, A) {
    const result = new Array(N).fill(0);
    let currentMax = 0;
    let lastUpdate = 0; // 마지막 max counter 값

    for (let i=0; i<A.length; i++) {
        if (A[i]>= 1 && A[i]<=N) {
            // lastUpdate보다 작으면 먼저 업데이트
            if (result[A[i]-1] < lastUpdate) {
                result[A[i]-1] = lastUpdate;
            }
            result[A[i]-1]++;
            currentMax = Math.max(currentMax,result[A[i]-1]);
        } else if (A[i] === N+1) {
            lastUpdate = currentMax; // 실제로 fill 안 하고, 기록만
        }
    }

    // 마지막에 한 번만 업데이트
    for (let i=0; i<result.length; i++) {
        if (result[i] < lastUpdate) {
            result[i] = lastUpdate;
        }
    }
    return result;
}
```

## 암기 팁
```js
// 지연 업데이트 패턴

// 변수 3개
let currentMax = 0;      // 현재까지 최댓값
let lastUpdate = 0;      // 마지막 "max counter" 값

// 증가할 때
if (counters[idx] < lastUpdate) {
    counters[idx] = lastUpdate;  // 먼저 끌어올림
}
counters[idx]++;

// max counter 만나면
lastUpdate = currentMax;  // fill 대신 기록만

// 마지막 정리
for (모든 카운터) {
    if (작으면) 끌어올림;
}
```
