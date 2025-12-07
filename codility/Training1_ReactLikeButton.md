# React Component: Like Button

## 문제 설명
- **출처** : Codility
- **난이도** : Easy
- **링크** : https://app.codility.com/programmers/trainings/8

[문제 요약]
> [!NOTE]
> React를 사용하여 'Like Button' 컴포넌트를 구현하는 문제입니다.

## 내 풀이

### 접근 방법
클래스형 컴포넌트를 사용하여 Like Button을 구현
- cx 라이브러리를 사용하여 조건부 클래스 네임 적용
- constructor에서 초기 상태 설정 (likeCount: 100, clicked: false)
- setState를 사용하여 버튼 클릭 시 상태 업데이트

### 코드
```javascript
import cx from 'classnames';
import { Component } from 'react';

export default class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likeCount: 100,
            clicked: false
        }
    }

    clickButton = () => {
        this.setState(prevState => ({
            likeCount: prevState.clicked ? prevState.likeCount - 1 : prevState.likeCount + 1,
            clicked: !prevState.clicked
        }))
    };
    
    render() {
        const { likeCount, clicked } = this.state;
        return (
            <>
                <div>
                    <h2>Like Button</h2>
                    <button className={cx('like-button', {liked: clicked})} onClick={this.clickButton}>
                        <span>Like | </span>
                        <span className="likes-counter">{likeCount}</span>
                    </button>
                </div>
                <style>{`
                    .like-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:  #585858;
                    }
                   .liked {
                        font-weight: bold;
                        color: #1565c0;
                   }
                `}</style>
            </>
        );
    }
}
```