# 클래스형 컴포넌트
```jsx
import React, { Component } from 'react';

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      items: []
    };
  }
  
  // 이벤트 핸들러 (화살표 함수로 this 바인딩)
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
    // 또는 함수형 업데이트
    this.setState(prev => ({ count: prev.count + 1 }));
  }
  
  // 라이프사이클
  componentDidMount() {
    // 컴포넌트 마운트 후 (useEffect 빈 배열과 동일)
    fetch(url).then(res => res.json()).then(data => {
      this.setState({ items: data });
    });
  }
  
  render() {
    const { count, items } = this.state;
    
    return (
      <div className="wrapper">
        <p>{count}</p>
        <button onClick={this.handleClick}>Click</button>
        {items.map(item => <li key={item.id}>{item.name}</li>)}
      </div>
    );
  }
}
```

# 함수형 <-> 클래스형 컴포넌트 비교
```jsx
// 상태 관리
함수형: const [count, setCount] = useState(0);
클래스: this.state = { count: 0 };
       this.setState({ count: 1 });

// 상태 읽기
함수형: {count}
클래스: {this.state.count}

// 이벤트 핸들러
함수형: const handleClick = () => { setCount(count + 1); }
클래스: handleClick = () => { this.setState({ count: this.state.count + 1 }); }

// 이펙트
함수형: useEffect(() => { fetch... }, []);
클래스: componentDidMount() { fetch... }

// 렌더
함수형: return <div>...</div>
클래스: render() { return <div>...</div> }
```