# Distinct

## 문제 설명
- **출처**: Codility
- **난이도**: Easy
- **링크**: https://app.codility.com/programmers/lessons/6-sorting/distinct/
- **문제유형**: 해시(Hash)

[문제 요약]
> [!NOTE]
> 배열 A에서 고유한 값의 개수를 반환

## 풀이
```js
function solution(A) {
    return new Set(A).size; 
}
```

## 추가로 생각해볼 거리
영어 지문을 잘못 이해해서 '최빈값 찾기'라고 생각했음ㅎㅋ
이참에 최빈값 찾기라면?
```js
function solution(A) {
    const count = {};
    
    for (let i=0; i<A.length; i++) {
        count[A[i]] = (count[A[i]] || 0) + 1;
    }
    
    return Math.max(...Object.values(count));
}
```