import { useState, useEffect } from 'react';
import { UserDeleteOutlined, StopOutlined } from '@ant-design/icons';
import { Space } from 'antd';

import axios from 'axios';

const BlockButton = ({ handleBlockUser }) => {
    const [btnMode, setBtnMode] = useState('block');
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {

        if (btnMode === 'block') {
            // setCountdown(3);
            return;
        }

        let timer = null;
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else {
            handleBlockUser();
        }

        return () => {
            clearTimeout(timer);
        };
    }, [countdown, handleBlockUser]);

    const handleBlockClick = () => {
        setCountdown(3);
        setBtnMode('cancel');
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