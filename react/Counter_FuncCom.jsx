import React, { useState } from 'react'

export default function Counter_FuncCom () {
    const [count, setCount] = useState(0);

    const clickPlusButton = () => {
        setCount(prev => prev+1);
    }

    const clickMinusButton = () => {
        if (count === 0) return;
        setCount(prev => prev-1);
    }

    const clickResetButton = () => {
        setCount(0);
    }

    return (
        <>
            <div>
                <button onClick={clickPlusButton}>
                    <span>+</span>
                </button>
                <span className={count>10 ? 'high' : ''}>{count}</span>
                <button onClick={clickMinusButton}>
                    <span>-</span>
                </button>
                <button onClick={clickResetButton}>
                    <span>reset</span>
                </button>
            </div>
        </>
    )
}