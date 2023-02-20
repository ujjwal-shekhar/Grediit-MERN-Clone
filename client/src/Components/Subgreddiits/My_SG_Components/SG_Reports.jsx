import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import ReportCard from '../../Reports/ReportCard';

import axios from 'axios';

export default function ReportContainer({ subgreddiitName }) {
  const [reports, setReports] = React.useState([]);

  React.useEffect(() => {
    console.log(subgreddiitName);
    axios.get(
      `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/reports`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
    )
      .then((response) => {
        console.log(response.data);
        setReports(response.data.reports);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        {
            (reports.length > 0) ? (reports.map((report, index) => {
                console.log(subgreddiitName);
                return (
                    <ReportCard
                    key={index}
                    subgreddiitName={subgreddiitName}
                    reportID={report}
                    />
                )
                }
            )) : (<h1>No reports yet</h1>)
        }
        {/* {
          (posts.length > 0) ? (posts.map((post, index) => {
            console.log(subgreddiitName);
            return (
              <PostCard
                key={index}
                subgreddiitName={subgreddiitName}
                postID={post}
              />
            )
          })) : (<h1>No posts yet</h1>)
        } */}
      </Container>
    </React.Fragment>
  );
}