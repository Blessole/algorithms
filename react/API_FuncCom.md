# API 연동 구현하기

## 요구사항
기능:
1. 컴포넌트 마운트 시 자동으로 데이터 fetch
2. API: https://jsonplaceholder.typicode.com/posts
3. 상태 관리:
    - loading: 로딩 중 표시
    - error: 에러 발생 시 메시지
    - data: 가져온 데이터
4. 화면 표시:
    - 로딩 중: "Loading..."
    - 에러: "Error: {에러 메시지}"
    - 성공: 각 post의 title을 리스트로

보너스 (시간 남으면):
- 각 post 클릭하면 body 보이기/숨기기
- 검색 기능 (title 필터링)


## 내 코드
```jsx
import React, { useEffect, useState } from 'react';

export default function API_FuncCom() {
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await res.json();
                setPostList(data.map(d => ({...d, isToggled: false})));
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    },[])

    const setFilteredList = () => {
        if (filter) {
            return postList.filter(post => post.title.toLowerCase().includes(filter.toLowerCase()));
        }
        return postList;
    }

    const filteredList = setFilteredList();

    const togglePost = (idx) => {
        setPostList(postList.map(((post, i) =>
            i === idx ? {...post, isToggled: !post.isToggled } : post
        )));
    }

    return (
        <>
            {/* 검색 기능 */}
            <div>
                <input type="text" value={filter}
                       onChange={e => setFilter(e.target.value)}
                       onKeyDown={(e) => {
                           if(e.key === 'Enter') {
                               setFilteredList()
                           }
                       }}
                />
                <button onClick={setFilteredList}>검색</button>
            </div>

            {/* 포스트 리스트 출력 */}
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : filteredList.length < 1 ? (
                    <p>검색 결과가 없습니다.</p>
                ) : (
                    filteredList.map((item, i) => (
                        <div key={i}>
                            <div onClick={() => togglePost(i)}>
                                    <span>{item.title}</span>
                            </div>
                            {item.isToggled && (
                                <div>
                                    <span>{item.body}</span>
                                </div>
                            )}
                        </div>
                        )))
                }
            </div>
        </>
    )
}
```

## 주의할 점
### 1. useEffect + async/await 로 fetch 구현하기 
```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setData(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

### 2. 조건 연산자
```jsx
// && : 조건이 true 일 때만 렌더링
{condition && <div>show</div>}

// ?? : null/undefined 체크 (기본값)
const value = data ?? 'default';
```

## 더 좋은 코드
### 1. Toggle 구현은 Set을 활용해보자!
```jsx
// post 에 isToggled 상태를 넣는게 아님!
const [expandedIds, setExpandedIds] = useState(new Set());

const togglePost = (id) => {
    const newSet = new Set(expandedIds);
    if (newSet.has(id)) {
        newSet.delete(id);
    } else {
        newSet.add(id);
    }
    setExpandedIds(newSet);
}

// 렌더링 할 때!
{expandedIds.has(item.id) && <div>{item.body}</div>}
```

### 2. 실시간 필터링
```jsx
<input
    type="text"
    value={filter}
    onChange={e => setFilter(e.target.value)}
    placeholder="제목 검색..."
/>
```

### 3. 인덱스 대신 ID 사용
```jsx
togglePost(item.id)

const togglePost = (id) => {
    setExpandedIds(prev => {
        const newSet = new Set(prev);
        newSet.has(id) ? newSet.delete(id) : newSet.add(id);
        return newSet;
    })
}
```