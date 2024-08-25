import React,{useState, useEffect} from 'react'
import appwriteService from '../appwrite/config'
import { Container,PostCard } from '../components'

import { useSelector,useDispatch } from 'react-redux'
import { login } from '../store/authSlice'

import authService from "../appwrite/auth"

const AllPosts = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    appwriteService.getPosts([]).then((posts)=>
        {if (posts) {
            setPosts(posts.documents)
        }})

const dispatch = useDispatch();
const userData = useSelector((state) => state.auth.userData)

useEffect(() => {
    const fetchUserData = async () => {
        try {
            const currentUser = await authService.getCurrentUser();
            if (currentUser) {
                dispatch(login({ userData: currentUser }));
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    if (!userData) {
        fetchUserData();
    }
}, [dispatch, userData]);


  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>

        </Container>
      
    </div>
  )
}

export default AllPosts
