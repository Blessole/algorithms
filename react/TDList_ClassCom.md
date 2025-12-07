# 투두리스트 만들기 (클래스형 컴포넌트)

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


## 내 코드
```jsx
import React, { Component } from 'react'

export default class TDList_ClassCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTodo: '',
            todoList: [],
            filter: '',
        }
    }

    addTodo = () => {
        if (!this.state.newTodo) return;
        this.setState((prevState) => ({
            todoList: [...prevState.todoList, {content: this.state.newTodo, isDone: false}],
            newTodo: ''
        }))
    }

    toggleTodo = (idx) => {
        this.setState((prevState) => ({
           todoList:  prevState.todoList.map((todo,i) =>
               i === idx ? {...todo, isDone: !todo.isDone} : todo
           )
        }))
    }

    deleteTodo = (idx) => {
        this.setState((prevState) => ({
            todoList: prevState.todoList.filter((_,i) => i!==idx)
        }))
    }

    render() {
        const {newTodo, todoList, filter} = this.state;

        const getFilteredList = () => {
            if (filter === 'DONE') return todoList.filter(todo => todo.isDone);
            if (filter === 'NOTYET') return todoList.filter(todo => !todo.isDone);
            return todoList;
        }

        const filteredList = getFilteredList();
        return (
            <>
                <div>
                    <input value={newTodo} onChange={(e) => this.setState({newTodo: e.target.value})}/>
                    <button onClick={this.addTodo}>추가</button>
                </div>
                <div>
                    <button onClick={() => this.setState({filter : 'ALL'})}>전체보기</button>
                    <button onClick={() => this.setState({filter : 'DONE'})}>완료된 것 보기</button>
                    <button onClick={() => this.setState({filter : 'NOTYET'})}>미완료된 것만 보기</button>
                </div>
                <div>
                    {filteredList.length < 1 ? '할 일을 생성해주세요.' : (
                        <>
                            {filteredList.map((todo, i) => (
                                <div key={i}>
                                    <input type="checkbox" checked={todo.isDone} onChange={() => this.toggleTodo(i)} />
                                    <span>{todo.content}</span>
                                    <button onClick={() => this.deleteTodo(i)}>delete</button>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </>
        )
    }
}
```

## 주의사항
### setState 불변성 꼭 조심하기!
```jsx
// ❌ 절대 안 됨!
this.setState((prevState) => {
    prevState.todoList.push(...)  // 직접 수정 X
})

// ✅ 반드시 새 객체 반환!
this.setState((prevState) => ({
    todoList: [...prevState.todoList, newItem]  // 새 배열
}))

// ✅ 또는 간단한 경우:
this.setState({ newTodo: '' })
```

### 이벤트 핸들러
```jsx
// ❌ 즉시 실행됨
onClick={this.handleClick()}
onClick={this.setState({...})}

// ✅ 함수로 감싸기
onClick={this.handleClick}
onClick={() => this.handleClick(idx)}
onClick={() => this.setState({...})}
```

