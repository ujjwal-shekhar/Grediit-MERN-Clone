import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" onClick={handleNameChange}>
                Name
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item (disabled)
            </a>
        ),
        icon: <SmileOutlined />,
        disabled: true,
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item (disabled)
            </a>
        ),
        disabled: true,
    },
    {
        key: '4',
        danger: true,
        label: 'a danger item',
    },
];
const App = ({ sortFilter, setSortFilter }) => {

    const [nameMode, setNameMode] = useState(null)
    const handleNameChange = () => {
        if (nameMode === 'Ascending') {
            setNameMode('Descending')
        } else if (nameMode === null){
            setNameMode('Ascending')
        } else {
            setNameMode(null)
            // Remove name from sortFilter
            sortFilter.remove(
                sortFilter.find((item) => item === )
            )
        }
    }

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