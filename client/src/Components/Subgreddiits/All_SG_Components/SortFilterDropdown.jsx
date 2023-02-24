import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useState } from 'react';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const App = ({ sortFilter, setSortFilter }) => {
    const [nameMode, setNameMode] = useState(null)
    const [followersSort, setFollowersSort] = useState(false)
    const handleNameChange = () => {
        if (nameMode === 'Ascending') {
            setNameMode('Descending')
            for (let i = 0; i < Object.keys(sortFilter).length; i++) {
                if (sortFilter[i].val.includes('AscendingName')) {
                    delete sortFilter[i];
                }
            }
            sortFilter[Object.keys(sortFilter).length]
                = { pos: Object.keys(sortFilter).length, val: 'DescendingName' }

        } else if (nameMode === null) {
            setNameMode('Ascending')

            sortFilter[Object.keys(sortFilter).length]
                = { pos: Object.keys(sortFilter).length, val: 'AscendingName' }
        } else {
            setNameMode(null)
            for (let i = 0; i < Object.keys(sortFilter).length; i++) {
                if (sortFilter[i].val.includes('DescendingName')) {
                    delete sortFilter[i];
                }
            }
            setSortFilter(sortFilter)
        }
        console.log('Sort and filtering : ', sortFilter)
    }

    const handleFollowers = () => {
        if (followersSort) {
            setFollowersSort(false)
            for (let i = 0; i < Object.keys(sortFilter).length; i++) {
                if (sortFilter[i].val.includes('Followers')) {
                    delete sortFilter[i];
                }
            }
            setSortFilter(sortFilter)
        } else {
            setFollowersSort(true)
            sortFilter[Object.keys(sortFilter).length]
                = { pos: Object.keys(sortFilter).length, val: 'Followers' }
        }
    }

    const nameIcon = (
        nameMode === 'Ascending'
            ?
            <ArrowDropUpIcon />
            :
            nameMode === 'Descending'
                ?
                <ArrowDropDownIcon />
                :
                <HorizontalRuleIcon />
    )

    const followersSortIcon = (
        followersSort
            ?
            <CheckIcon />
            :
            <ClearIcon />
    )

    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" onClick={handleNameChange}>
                    Name
                </a>
            ),
            icon : nameIcon
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" onClick={handleFollowers}>
                    Followers (Descending)
                </a>
            ),
            icon: followersSortIcon,
        },
    ];

    return (
        <Dropdown
            menu={{
                items,
            }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <DownOutlined />
                    Sort & Filter
                </Space>
            </a>
        </Dropdown>
    )
};
export default App;