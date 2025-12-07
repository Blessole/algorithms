# Frog River One

## 문제 설명
- **출처**: Codility
- **난이도**: Easy
- **링크**: https://app.codility.com/programmers/lessons/4-counting_elements/frog_river_one/
- **문제유형**: 해시(Hash),그리디(조건 만족하는 최초 시점 찾기)

[문제 요약]
> [!NOTE]
> 개구리가 강을 건너려고 해요. 위치 0에서 X까지 가야 함.
낙엽이 떨어져서 징검다리가 됨
시간 K에 위치 A[K]에 낙엽 떨어짐
1부터 X까지 모든 위치에 낙엽이 있어야 건널 수 있음
개구리가 건널 수 있는 가장 빠른 시간은?

## 내 풀이

## 내 접근법
1~X까지 다 모이는 시점을 찾아야 함!

```js
function solution(X, A) {
    const positions = new Set();
    
    for (let i=0; i < A.length; i++) {
        positions.add(A[i]);
        
        // 1부터 X까지 다 모았나?
        if (positions.size === X) {
            return i;
        }
    }
    
    return -1; // 끝까지 못 모은 경우
}
```