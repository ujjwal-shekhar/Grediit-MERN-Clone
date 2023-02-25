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
    const [creationSort, setCreationSort] = useState(false)
    const handleNameChange = () => {
        if (nameMode === 'AscendingName') {
            setNameMode('DescendingName')
            let tempFilter = sortFilter.filter((item) => {
                return item.val !== 'AscendingName'
            })
            sortFilter.push('DescendingName')
            setSortFilter(tempFilter);
        } else if (nameMode === 'DescendingName') {
            setNameMode(null)
            let tempFilter = sortFilter.filter((item) => {
                return item.val !== 'DescendingName'
            })
            setSortFilter(tempFilter);
        } else {
            setNameMode('Ascending')
            let tempFilter = sortFilter.filter((item) => {
                return item.val !== 'AscendingName'
            })
            tempFilter.push('AscendingName')
            setSortFilter(tempFilter);
        }
    }

    const handleFollowers = () => {
        if (followersSort) {
            setFollowersSort(false);
            let tempFilter = sortFilter.filter((item) => {
                return item.val !== 'Followers'
            })
            setSortFilter(tempFilter);
        } else {
            setFollowersSort(true)
            sortFilter.push('Followers')
        }
    }
    const handleCreation = () => {
        if (creationSort) {
            setCreationSort(false)
            let tempFilter = sortFilter.filter((item) => {
                return item.val !== 'CreationDate'
            })
            setSortFilter(tempFilter)
        } else {
            setCreationSort(true)
            let tempFilter = sortFilter.filter((item) => {
                return item.val !== 'CreationDate'
            })
            setSortFilter(tempFilter)
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
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" onClick={handleCreation}>
                    Creation Date (Newest first)
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