import {useContext, useEffect} from "react";
import {PostContext} from "../contexts/PostContext.jsx";
import {Card, Spinner, OverlayTrigger, Tooltip, Toast} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {AuthContext} from "../contexts/AuthContext.jsx";
import SinglePost from "../components/posts/SinglePost.jsx";
import AddPostModal from "../components/posts/AddPostModal.jsx";
import addIcon from "../assets/plus-circle-fill.svg"
import UpdatePostModal from "../components/posts/UpdatePostModal.jsx";


const Dashboard = () => {
    //contexts
    const {authState: {user: {username}}} = useContext(AuthContext)
    const {
        postState: {post, posts, postLoading},
        getPosts,
        setShowAddPostModal,
        showToast: {show, message, type},
        setShowToast
    } = useContext(PostContext)
    //get all posts

    useEffect(() => {
        (async () => {
            await getPosts();
        })();
    }, []);

    let body = null

    if (postLoading) {
        body = (<div className='spinner-container'>
            <Spinner animation='border' variant='info'/>
        </div>)
    } else if (posts.length === 0) {
        body = (<>
            <Card className='text-center mx-5 my-5'>
                <Card.Header as='h1'>Hi {username}</Card.Header>
                <Card.Body>
                    <Card.Title>Welcome to EduTracker</Card.Title>
                    <Card.Text>
                        Click the button below to track your first skill to learn
                    </Card.Text>
                    <Button
                        className='bg-[#609b8a]'
                        variant='primary'
                        onClick={setShowAddPostModal.bind(this, true)}
                    >
                        EduTracker!
                    </Button>
                </Card.Body>
            </Card>
        </>)
    } else {
        body = (<>
            <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                {posts.map(post => (<Col key={post._id} className='my-2'>
                    <SinglePost post={post}/>
                </Col>))}
            </Row>
            <OverlayTrigger
                placement='left'
                overlay={<Tooltip>Add a new thing to learn</Tooltip>}
            >
                <Button
                    className='btn-floating'
                    onClick={setShowAddPostModal.bind(this, true)}
                >
                    <img src={addIcon} alt='add-post' width='60' height='60'/>
                </Button>
            </OverlayTrigger>
        </>)
    }
    return (<>
        {body}
        <AddPostModal/>
        {post !== null && <UpdatePostModal/>}
        <Toast
            show={show}
            style={{position: 'fixed', top: '20%', right: '10px'}}
            className={`bg-${type} text-white`}
            onClose={setShowToast.bind(this, {
                show: false, message: '', type: null
            })}
            delay={3000}
            autohide
        >
            <Toast.Body>
                <strong>{message}</strong>
            </Toast.Body>
        </Toast>
    </>)
};

export default Dashboard;
