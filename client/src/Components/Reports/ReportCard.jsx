import { CheckOutlined, UserDeleteOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

import axios from 'axios';
import React from 'react';

// import Lo

const { Meta } = Card;
const ReportCard = ({ report, subgreddiitName }) => {
    console.log("In report card : SG Name : ", subgreddiitName)

    // const [report, setReport] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [reportedUser, setReportedUser] = React.useState({});
    const [reportedPost, setReportedPost] = React.useState({});
    const [reporter, setReporter] = React.useState({});

    const tabList = [
        {
            key: 'reportDetails',
            tab: 'Report Details',
        },
        {
            key: 'concernedPost',
            tab: 'Concerned Post',
        }
    ]



    const [activeTab, setActiveTab] = React.useState('reportDetails');
    const onTabChange = (key, type) => {
        setActiveTab(key);
    }

    React.useEffect(() => {
        axios.get(
            `http://localhost:8080/users/id/${report.reported_by}/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                setReporter(response.data);
                
            })
            .catch((err) => {
                console.log(err);
            })
        axios.get(
            `http://localhost:8080/users/id/${report.reported_user}/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                setReportedUser(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })
        axios.get(
            `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/post/${report.post}/details`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                setReportedPost(response.data.post);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })

        setLoading(false);
    }, [])


    // const handleIgnoreReport = () => {
    //     axios.post(
    //         `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/reports/${report.reportID}/ignore`,
    //         JSON.stringify({
    //             "status": "ignored"
    //         }),
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer ' + localStorage.getItem('token')
    //             }
    //         },
    //     )
    //         .then((response) => {
    //             console.log(response.data);
    //             window.location.reload();
    //         })

    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    

    // const handleDeletePost = () => {
    //     axios.delete(
    //         `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/posts/${report.postID}`,
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer ' + localStorage.getItem('token')
    //             }
    //         }
    //     )
    //         .then((response) => {
    //             console.log(response.data);
    //             window.location.reload();
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    // const handleBlockUser = () => {
    //     axios.post(
    //         `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/users/${report.userID}/block`,
    //         JSON.stringify({
    //             "status": "blocked"
    //         }),
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer ' + localStorage.getItem('token')
    //             }
    //         },
    //     )
    //         .then((response) => {
    //             console.log(response.data);
    //             window.location.reload();
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    const contentList = {
        concernedPost : (
            <div>
                <Card type="inner">
                    <Meta
                        title={reportedPost.title}
                        description={reportedPost.content}
                    />
                </Card>
                <br />
                <Card type="inner">
                    <Meta
                        title={"Concern by" + reporter.username}
                        description={report.concern}
                    />
                </Card>
                
            </div>
        ),
        reportDetails: (
            <div>
                Reported User : {reportedUser.username}
                <br />
                Reported by : {reporter.username}
                <br />
                Reported Post : {reportedPost.title}
            </div>
        ),
    }

    if (loading) {
        return (
            <Card
                style={{
                width: 300,
                marginTop: 16,
                }}
                loading={loading}
            ></Card>
        )
    }

    return (
        <Card
            style={{
                width: 300,
            }}
            // title={"Report Posted by hooman"}
            actions={[
                <DeleteOutlined key="delete" onClick={handleDeletePost} 
                disabled={report.status === "ignored"}/>,
                <CheckOutlined key="ignore" onClick={handleIgnoreReport}
                disabled={report.status === "ignored"}/>,
                <UserDeleteOutlined key="block" onClick={handleBlockUser}
                disabled={report.status === "ignored"}/>,
            ]}

            tabList={tabList}
            activeTabKey={activeTab}
            onTabChange={onTabChange}
        >
            {contentList[activeTab]}

        </Card>
    )
}
export default ReportCard;