import { Input, Space } from 'antd';
const { Search } = Input;

const onSearch = (value) => {
    console.log(value);
}

const App = () => (
    <Space direction="vertical">
        <Search
            placeholder="Search Greddiit"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
        />
    </Space>
);
export default App;