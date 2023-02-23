import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import Comment from './Comments';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import ReportIcon from '@mui/icons-material/Report';
import SaveIcon from '@mui/icons-material/Save';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import Loading from '../pages/Loading';
import CreateCommentForm from './CreateCommentForm';
import CreateReportForm from '../Reports/CreateReportForm';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import axios from 'axios';

import PostCreator from './PostCreator';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};

export default function PostCard({ post }) {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [subgreddiitName, setSubgreddiitName] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const [openCommentForm, setOpenCommentForm] = React.useState(false);
  const [openReportForm, setOpenReportForm] = React.useState(false);
  const handleOpenCommentForm = () => setOpenCommentForm(true);
  const handleCloseCommentForm = () => setOpenCommentForm(false);
  const handleOpenReportForm = () => setOpenReportForm(true);
  const handleCloseReportForm = () => setOpenReportForm(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(Boolean(anchorEl));
    console.log("clicked settings")
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    console.log("PostCard mounted")
    axios.get(
      `http://localhost:8080/subgreddiits/ID/${post.posted_in}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log("SG RES : ", response)
        setSubgreddiitName(response.data.name);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleUpvote = () => {
    console.log("clicked upvote")
    axios.post(
      `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/post/${post._id}/vote`,
      JSON.stringify({
        "vote_type": "UPVOTE"
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
    )
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleDownvote = () => {
    console.log("clicked downvote")
    axios.post(
      `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/post/${post._id}/vote`,
      JSON.stringify({
        "vote_type": "DOWNVOTE"
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
    )
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleUnsavePost = () => {
    console.log("clicked save")
    axios.post(
      `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/post/${post._id}/unsave`,
      JSON.stringify({
        "save": true
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
    )
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleFollowPoster = () => {
    // axios.get(
    //   `http://localhost:8080/add/follower/${post.posted_by}`,
    // )
  }

  if (loading) {
    return <Loading />
  }

  console.log("Post fetched : ", post);

  console.log("After the post card has loaded the post is : ", post);
  return (
    <>
      <Modal
        open={openCommentForm}
        onClose={handleCloseCommentForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateCommentForm postID={post._id} subgreddiitName={subgreddiitName} />
        </Box>

      </Modal>
      <Modal
        open={openReportForm}
        onClose={handleCloseReportForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateReportForm postID={post._id} postCreator={post.posted_by} subgreddiitName={subgreddiitName} subgreddiitID={post.posted_in} />
        </Box>

      </Modal>
      <Card sx={{ maxWidth: 500 }}>
        <CardHeader
          // avatar={
          //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          //     R
          //   </Avatar>
          // }
          action={
            <>
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Popover
                id={id}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Stack spacing={2}>
                  <IconButton aria-label="Report" onClick={handleOpenReportForm}>
                    <ReportIcon />
                    <Typography variant='overline' sx={{ marginLeft: 1 }}>Report Post</Typography>
                  </IconButton>
                  <IconButton aria-label="Unsave" onClick={handleUnsavePost}>
                    <SaveIcon />
                    <Typography variant='overline' sx={{ marginLeft: 1 }}>Unsave a Post</Typography>
                  </IconButton>
                  <IconButton aria-label="Follow" onClick={handleFollowPoster}>
                    <PersonAddIcon />
                    <Typography variant='overline' sx={{ marginLeft: 1 }}>Follow the user</Typography>
                  </IconButton>
                </Stack>
              </Popover>
            </>
          }
          title={post.title}
        // subheader="September 14, 2016"
        />

        <CardContent>
          <h5>Creator: </h5>
          <PostCreator postCreator={post.posted_by} subgreddiitName={subgreddiitName}/>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
          {/*Display upvote and downvote*/}
          <Typography variant="body2" color="text.secondary">
            Upvotes : {post.upvotes.length}
            <br></br>
            Downvotes : {post.downvotes.length}
            <br></br>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Upvote" onClick={handleUpvote}>
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton aria-label="Downvote" onClick={handleDownvote}>
            <ArrowDownwardIcon />
          </IconButton>

          <IconButton aria-label="Add Comment" onClick={handleOpenCommentForm}>
            <Fade in={expanded}>
              <AddCommentIcon />
            </Fade>
          </IconButton>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {/* <ExpandMoreIcon /> */}
            <CommentIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {
              post.comments.map((comment, index) => {
                return (
                  <Comment key={index} content={comment} />
                )
              })
            }
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}