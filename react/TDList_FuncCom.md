# 투두리스트 만들기 (함수형 컴포넌트)

## 요구사항
기능:
1. input + 추가 버튼
    - 빈 input 제출 방지
2. Enter 키로도 추가 가능
3. 각 todo 항목에:
    - 체크박스 (완료/미완료 토글)
    - 삭제 버튼
4. 필터 버튼 3개:
    - 전체 보기
    - 완료된 것만
    - 미완료된 것만
5. 완료된 todo는 취소선 스타일
6. Todo 개수 표시

## 핵심 포인트
1. input은 항상 value + onChange 세트!
```jsx
<input value={state} onChange={(e) => setState(e.target.value)} />
```

2. 배열 map에는 항상 key!
```jsx
{arr.map((item, idx) => <div key={idx}>...</div>)}
```

3. style은 객체로!
```jsx
style={{ textDecoration: 'line-through' }}
```

4. 배열 업데이트는 불변성!
```jsx
setArr([...arr, newItem])  // 추가
setArr(arr.filter((_, i) => i !== idx))  // 삭제
setArr(arr.map((item, i) => i === idx ? updated : item))  // 수정
```

5. Enter 키 감지
```jsx
onKeyDown={(e) => { if (e.key === 'Enter') ... }}
```

## 내 코드

```jsx
import React, { useState } from 'react';

export default function TDList_FuncCom() {
    const [newTodo, setNewTodo] = useState('');
    const [todoList, setTodoList] = useState([]);  // 원본 데이터
    const [filter, setFilter] = useState('ALL'); 

    const addTodoList = () => {
        if (!newTodo) return;
        setTodoList([...todoList, {content: newTodo, isDone: false}])
        setNewTodo('');
    }

    const getFilteredList = () => {
        if (filter === 'DONE') return todoList.filter(todo => todo.isDone)
        if (filter === 'NOTYET') return todoList.filter(todo => !todo.isDone)
        return todoList;
    }
    
    // 화면 출력용 데이터
    const filteredList = getFilteredList();

    const toggleTodo = (idx) => {
        setTodoList(todoList.map((todo, i) =>
            i === idx ? { ...todo, isDone: !todo.isDone} : todo
        ))
    }

    const deleteTodo = (idx) => {
        setTodoList(todoList.filter((_, i) => i !== idx));
    }

    return (
        <>
            <div>
                <input
                    type="text"
                    onKeyDown={(e) => {if (e.key === 'Enter') addTodoList()}}
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={addTodoList}>추가</button>
            </div>
            <div>
                <button onClick={() => setFilter('ALL')}>전체보기</button>
                <button onClick={() => setFilter('DONE')}>완료된 것만</button>
                <button onClick={() => setFilter('NOTYET')}>미완료된 것만</button>
            </div>
            <div className="title">
                <h1>TODO {todoList.length}</h1>
            </div>
            <div>
                {filteredList.length < 1 ? '할 일을 추가해주세요.' : (
                    <div>
                        {filteredList.map(((item, idx) => (
                            <div key={idx}>
                                <input type="checkbox" checked={item.isDone} onChange={toggleTodo}/>
                                <span style={{ textDecoration : item.isDone ? 'line-through' : 'none' }}>
                                    {item.content}
                                </span>
                                <button onClick={() => deleteTodo(idx)}>x</button>
                            </div>
                        )))}
                    </div>
                )}
            </div>
        </>
    )
}
```