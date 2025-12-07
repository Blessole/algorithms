# Cyclic Rotation

## 문제 설명
- **출처**: Codility
- **난이도**: Easy
- **링크**: https://app.codility.com/programmers/lessons/2-arrays/cyclic_rotation/
- **문제유형**: 배열

[문제 요약]
> [!NOTE]
> 배열 A를 오른쪽으로 K번 회전

## 내 풀이

### 접근 방법
- K가 배열 길이보다 클 수 있으니, 나머지 연산을 해줘야 함!!!!
- slice를 더 짧고 쉽게 쓸 수 있는 방법
- 엣지 케이스 : 빈 배열, K = 0, K가 배열 길이보다 큼

```js
function solution(A, K) {
    if (A.length === 0) return A;
    const k = K % A.length;
    return [...A.slice(-k), ...A.slice(0,-k)]
}
```