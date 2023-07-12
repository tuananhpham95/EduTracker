import {createContext, useReducer, useState} from "react";
import {postReducer} from "../reducers/PostReducer.jsx";
import {
    apiUrl,
    POSTS_LOADED_SUCCESS,
    POSTS_LOADED_FAIL,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
    FIND_POST
} from "./constants.jsx";
import axios from "axios";

export const PostContext = createContext()

const PostContextProvider = ({children}) => {
    //state

    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postLoading: true,
    })
    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })
    //get all posts
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/post`)
            if (response.data.success) {
                dispatch({type: POSTS_LOADED_SUCCESS, payload: response.data.posts})
            }
        } catch (error) {
            dispatch({type: POSTS_LOADED_FAIL})
        }
    }
    //add post
    const addPost = async newPost => {
        try {
            const response = await axios.post(`${apiUrl}/post`, newPost)
            if (response.data.success) {
                dispatch({type: ADD_POST, payload: response.data.post})
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: 'Server Error'}
        }
    }
    //delete post
    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${apiUrl}/post/${postId}`)
            if (response.data.success) {
                dispatch({type: DELETE_POST, payload: postId})
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: 'Server Error'}
        }
    }
    //find post when user is updating post
    const findPost = postId => {
        const post = postState.posts.find(post => post._id === postId)
        dispatch({type: FIND_POST, payload: post})
    }


    //update post
    const updatePost = async updatedPost => {
        try {
            const response = await axios.put(
                `${apiUrl}/post/${updatedPost._id}`,
                updatedPost
            )
            if (response.data.success) {
                dispatch({type: UPDATE_POST, payload: response.data.post})
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : {success: false, message: 'Server error'}
        }
    }
    //Post context data
    const postContextData = {
        postState,
        getPosts,
        showAddPostModal,
        setShowAddPostModal,
        addPost,
        showToast,
        setShowToast,
        deletePost,
        findPost,
        updatePost,
        showUpdatePostModal,
        setShowUpdatePostModal
    }
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}
export default PostContextProvider