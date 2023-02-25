import { useState, useEffect } from 'react';
import { UserDeleteOutlined, StopOutlined } from '@ant-design/icons';
import { Space } from 'antd';

import axios from 'axios';

const BlockButton = ({ handleBlockUser }) => {
    const [btnMode, setBtnMode] = useState('block');
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        console.log("useEffect called")
        if (btnMode === 'block') {
            setCountdown(3);
            return;
        }
        console.log("useEffect called but aage ")

        let timer = null;
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
                console.log(countdown);
            }, 1000);
        } else {
            handleBlockUser();
        }

        return () => {
            clearTimeout(timer);
        };
    }, [countdown, btnMode]);

    const handleBlockClick = () => {
        setBtnMode('cancel');
        setCountdown(3);    
    }

    return (
        <div>
            {
                btnMode === 'block' ?
                    <UserDeleteOutlined onClick={handleBlockClick} />
                    :
                    <Space>
                        <StopOutlined onClick={() => {
                            setBtnMode('block');
                            setCountdown(3);
                        }}>
                        </StopOutlined>
                        <div className='mt-1 small'> Cancel in {countdown} </div>
                    </Space>

            }
        </div>
    )

};

export default BlockButton;