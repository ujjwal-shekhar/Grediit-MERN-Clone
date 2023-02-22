import { Input, Space } from 'antd';
const { Search } = Input;


const App = ({ searchValue, setSearchValue }) => {
    const onSearch = (value) => {
        setSearchValue(value);
    }

    return (<Space direction="vertical">
        <Search
            placeholder="Search Greddiit"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
        />
    </Space>)
}

export default App;