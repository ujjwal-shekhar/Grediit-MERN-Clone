import React, { useState, useEffect } from 'react';
import { UserDeleteOutlined, StopOutlined } from '@ant-design/icons';


const BlockButton = ({ onClick }) => {
    // When block button is pressed it changes to another button with
    // a countdown like “Cancel in 3 secs” (where 3 will change to 2
    //    after 1 second and so on). If the timer reaches 0, the user is
    //     blocked, otherwise the moderator can press cancel to abort.

    const [count, setCount] = useState(3);
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        if (count === 0) {
            setIsBlocked(true);
            onClick();
        }
    }
        , [count]);

    const handleBlock = () => {
        const interval = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);

        if (isBlocked) {
            clearInterval(interval);
        }

        if (count === 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }

    return (
        <div>
            {isBlocked ? (
                <UserDeleteOutlined />
            ) : (
                <StopOutlined onClick={onClick}/>
                // <button onClick={handleBlock}>
                //     Block
                // </button>
            )}
            {count}
        </div>
    );
};

export default BlockButton;