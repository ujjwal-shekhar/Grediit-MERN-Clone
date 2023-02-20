import { CheckOutlined, UserDeleteOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

import axios from 'axios';
import React from 'react';

const { Meta } = Card;
const ReportCard = ({ report, subgreddiitName }) => {

    // const [report, setReport] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    // React.useEffect(() => {
    //     axios.get(
    //         `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/reports/${reportID}`,
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer ' + localStorage.getItem('token')
    //             }
    //         }
    //     )
    //         .then((response) => {
    //             console.log(response.data);
    //             setReport(response.data.report);
    //             setLoading(false);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }, [])

    const handleIgnoreReport = () => {
        axios.post(
            `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/reports/${report.reportID}/ignore`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            },
        )
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })

            .catch((err) => {
                console.log(err);
            })
    }

    

    const handleDeletePost = () => {
        axios.delete(
            `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/posts/${report.postID}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleBlockUser = () => {
        axios.post(
            `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/users/${report.userID}/block`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            },
        )
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Card
            style={{
                width: 300,
            }}
            // cover={
            //   <img
            //     alt="example"
            //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            //   />
            // }
            actions={[
                <DeleteOutlined key="delete" onClick={handleDeletePost}/>,
                <CheckOutlined key="ignore" onClick={handleIgnoreReport}/>,
                <UserDeleteOutlined key="block" onClick={handleBlockUser}/>,
            ]}
        >
            <Meta
                //   avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                title={report.posted_by}
                description={report.concern}
            />
        </Card>
    )
}
export default ReportCard;