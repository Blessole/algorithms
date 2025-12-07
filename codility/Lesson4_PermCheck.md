# PermCheck

## 문제 설명
- **출처**: Codility
- **난이도**: Easy
- **링크**: https://app.codility.com/programmers/lessons/4-counting_elements/perm_check/
- **문제유형**: 해시(Hash)

[문제 요약]
> [!NOTE]
> 배열 A가 순열(permutation)인지 확인
Permutation (순열) : 1부터 N까지의 숫자가 딱 한번씩만 나타나는 것

## 내 풀이

## 내 접근법 (오류)
for문을 돌면서, 필터 할 숫자를 하나씩 늘릴거임. 
총 개수기준으로 돌건데, 그 배열 안에 그 숫자가 없다면, 0, 다 돌고 빠져나오면 1!
```js
function solution(A) {
    const newA = A.sort((a,b) => a - b);

    for (let i=1; i<newA.length+1; i++) {
        if (newA[i] === newA[i-1]) return 0;
        
        let hasNum = newA.some(num => num === i);  // 너무 비효율적
        if (!hasNum) return 0;
    }
    return 1;
}
```

## 개선 사항
- 일단, 순열인지 아닌지를 확인하는게 필요!
1. 중복체크 -> Set 사용하기!
2. 최댓값 체크

```js
function solution(A) {
    const N = A.length;
    
    const set = new Set(A);
    if (set.size !== N) return 0;
    if (Math.max(...A) !== N) return 0;
    
    return 1;
}
```