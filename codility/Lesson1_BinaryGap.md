# Binary Gap

## 문제 설명
- **출처**: Codility
- **난이도**: Easy
- **링크**: https://app.codility.com/programmers/lessons/1-iterations/binary_gap/

[문제 요약]
> [!NOTE]
> 양의 정수 N의 이진 표현에서 가장 긴 binary gap의 길이를 찾는 문제입니다.
(Binary gap: 양쪽 끝이 모두 1로 둘러싸인 연속된 0들의 최대 시퀀스)

## 내 풀이

### 접근 방법
2진수로 변환 후 -> 마지막 1까지 자른 후 -> 1을 기준으로 split하여 0의 개수를 구함
- toString(2)를 사용하여 2진수로 변환
- lastIndexOf('1')를 사용하여 마지막 1의 위치를 찾음
- split('1')로 1을 기준으로 나누어 0의 연속된 부분을 배열로 만듦
- map(trim => trim.length)로 각 부분의 길이를 구함
- Math.max를 사용하여 최대 길이를 반환

```javascript
function solution(N) {
    const binaryN = N.toString(2);
    const substrN = binaryN.slice(0, binaryN.lastIndexOf('1') + 1);
    return Math.max(0, ...(substrN.split('1').map(trim => trim.length)))
}
```