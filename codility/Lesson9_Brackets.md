# Brackets

## 문제 설명
- **출처**: Codility
- **난이도**: Medium
- **링크**: https://app.codility.com/programmers/lessons/7-stacks_and_queues/brackets/
- **문제유형**: 

[문제 요약]
> 문자열 S가 올바르게 짝지어진 괄호인지 확인 (올바른 괄호: (), [], {}가 올바르게 짝지어짐)

## 풀이
단순히 개수만 셀게 아님. 순서가 있어야하네, 
하나가 들어왔어. 근데 다음에 다음거가 나왔어? 그럼 다음거가 먼저 닫아진 다음에 처음거가 닫아져야 해
시작 문자가 있고, 끝 문자가 있어. 이걸 먼저 분류를 해둬야할 듯
```js
function solution(S) {
    const stack = [];
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    }
    
    for (let char of S) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            // 끝 문자일 경우 
            // 일단 stack.length 확인
            if (stack.length === 0) return 0;
            
            // 짝이 안 맞는 경우
            const last = stack.pop();
            if (pairs[char] !== last) return 0;
        }
    }
    
    return stack.length === 0 ? 1 : 0;
}
```

### 회고
```js
// 1. for...of로 문자열 순회
for (let char of S) {
    console.log(char);
}

// 2. Stack 문법
stack.push(); // 꺼내기
stack[stack.length-1]; // 꺼내진 않고 확인만
stack.pop();
```