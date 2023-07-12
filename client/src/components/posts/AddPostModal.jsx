import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useContext, useState} from "react";
import {PostContext} from "../../contexts/PostContext.jsx";

const AddPostModal = () => {
    //Context
    const {showAddPostModal, setShowAddPostModal, addPost, setShowToast} = useContext(PostContext)

    //state
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })
    const {title, description, url} = newPost
    const onChangeNewPostForm = event => setNewPost({...newPost, [event.target.name]: event.target.value})
    const handleClose = () => {
        resetAddPostData()
    }
    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await addPost(newPost)
        resetAddPostData()
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }
    const resetAddPostData = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        })
        setShowAddPostModal(false)
    }
    return (
        <Modal show={showAddPostModal} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>What do you want to learn?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Title' name='title' required
                                      aria-describedby='title-help' value={title} onChange={onChangeNewPostForm}>
                        </Form.Control>
                        <Form.Text id='title-help' muted> required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as='textarea'
                                      rows={7} type='text' placeholder='Description' name='description'
                                      aria-describedby='title-help' value={description} onChange={onChangeNewPostForm}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Youtube Totorial URL' name='url' value={url}
                                      onChange={onChangeNewPostForm}>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' className='bg-[#cf8083]' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='primary' className='bg-[#609b8a]' type='submit'>
                        Learn it!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddPostModal;