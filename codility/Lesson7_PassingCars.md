# Passing Cars

## 문제 설명
- **출처**: Codility
- **난이도**: Easy
- **링크**: https://app.codility.com/programmers/lessons/5-prefix_sums/passing_cars/
- **문제유형**: Prefix sums (누적합), Counting (카운팅)

[문제 요약]
> [!NOTE]
> 0 = 동쪽으로 가는 차
1 = 서쪽으로 가는 차
차들이 일직선 도로에 있을 때, 지나치는 차량 쌍의 개수를 구하기
조건:
(P, Q) 쌍은 0 ≤ P < Q < N
A[P] = 0 (동쪽)
A[Q] = 1 (서쪽)
쌍의 개수가 1,000,000,000 넘으면 -1 반환

## 풀이
```js
function solution(A) {
    let eastCars = 0;
    let pairs = 0;

    for (let i=0; i<A.length; i++) {
        if (A[i] === 0) {
            eastCars++;
        } else {
            pairs += eastCars;

            if (pairs > 1000000000) return -1;
        }
    }

    return pairs;
}
```

### 회고
관점을 뒤쪽 기준으로 보고 더해가는게 특이했다. 그게 '누적합'이라는거다.
```js
// Prefix Sum 문제 힌트:

1. "구간"이 나오면 → 누적합
2. "이전까지의 합/개수" → 누적합
3. 이중 for문이 필요해 보이면 → 누적합으로 최적화 가능?
4. "~까지의 합" → prefixSum[i] - prefixSum[j]
```