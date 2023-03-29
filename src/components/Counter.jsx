import { counter } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from "react";

function Counter() {

    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    useEffect(() => {
        if (count > 0) {
            setText("Positive")
        } else if (count < 0) {
            setText("Negative")
        } else {
            setText("Zero")
        }
    }, [count]);

    return (
        <div className="counter">
            <h2> Current  {count}</h2>
            <h3>{text}</h3>
            <button onClick={() => { setCount(count + 1) }}> Up </button>
            <button onClick={() => { setCount(count - 1) }}> Down </button>        
        </div>
    )
}

export default Counter