import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useState } from 'react';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { FormItemInputContext } from 'antd/es/form/context';

const App = ({ sortFilter, setSortFilter }) => {
    const [nameMode, setNameMode] = useState(null)
    const [followersSort, setFollowersSort] = useState(false)
    const [creationSort, setCreationSort] = useState(false)

    const handleNameChange = () => {
        if (nameMode === 'AscendingName') {
            console.log("Case 1")
            setNameMode('DescendingName')
            let tempFilter = sortFilter.filter((item) => {
                return item !== 'AscendingName'
            })
            tempFilter.push('DescendingName')
            setSortFilter(tempFilter);
        } else if (nameMode === 'DescendingName') {
            console.log("Case 2")
            setNameMode(null)
            let tempFilter = sortFilter.filter((item) => {
                return item !== 'DescendingName'
            })
            setSortFilter(tempFilter);
        } else {
            console.log("Case 3")
            setNameMode('AscendingName')
            let tempFilter = sortFilter
            tempFilter.push('AscendingName')
            setSortFilter(tempFilter);
        }
        console.log("After updating this thang : ", sortFilter)
    }

    const handleFollowers = () => {
        if (followersSort) {
            setFollowersSort(false);
            let tempFilter = sortFilter.filter((item) => {
                return item !== 'Followers'
            })
            setSortFilter(tempFilter);
        } else {
            setFollowersSort(true)
            let tempFilter = sortFilter.filter((item) => {
                return item !== 'Followers'
            })
            tempFilter.push('Followers')
            setSortFilter(tempFilter);
        }
        console.log(sortFilter)
    }
    const handleCreation = () => {
        if (creationSort) {
            setCreationSort(false)
            let tempFilter = sortFilter.filter((item) => {
                return item!== 'CreationDate'
            })
            setSortFilter(tempFilter)
        } else {
            setCreationSort(true)
            let tempFilter = sortFilter.filter((item) => {
                return item !== 'CreationDate'
            })
            tempFilter.push('CreationDate')
            setSortFilter(tempFilter)
        }
        console.log(sortFilter)
    }

    const nameIcon = (
        nameMode === 'AscendingName'
            ?
            <ArrowDropUpIcon />
            :
            nameMode === 'DescendingName'
                ?
                <ArrowDropDownIcon />
                :
                <ClearIcon />
    )

    const followersSortIcon = (
        followersSort
            ?
            <CheckIcon />
            :
            <ClearIcon />
    )
    const creationSortIcon = (
        creationSort
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
            icon: creationSortIcon,
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