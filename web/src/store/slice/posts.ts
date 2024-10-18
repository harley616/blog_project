import { createSlice, Dispatch } from '@reduxjs/toolkit'
import call from '../api'

export type PostType = {
	_id: string
	title: string
	body: string
	date: number
	isOpen?: boolean
}

export const dummyData: PostType[] = [
	{
		_id: '1',
		title: 'First Post',
		body: 'This is the first post.',
		date: 1634567890,
	},
	{
		_id: '2',
		title: 'Second Post',
		body: 'This is the second post.',
		date: 1634567900,
	},
	{
		_id: '3',
		title: 'Third Post',
		body: 'This is the third post.',
		date: 1634567910,
	},
	{
		_id: '4',
		title: 'Fourth Post',
		body: 'This is the fourth post.',
		date: 1634567910,
	},
	{
		_id: '5',
		title: 'Fifth Post',
		body: 'This is the fifth post.',
		date: 1634567910,
	},
]

interface PostsState {
	posts: PostType[]
	activeIndex: number
	makePostModal: boolean
}

const initialState: PostsState = {
	posts: [],
	activeIndex: 0,
	makePostModal: false,
}

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		setPosts: (state, action) => {
			state.posts = action.payload
		},
		setActiveIndex: (state, action) => {
			state.activeIndex = action.payload
		},
		setMakePostModal: (state, action) => {
			state.makePostModal = action.payload
		},
	},
})

export const { setPosts, setActiveIndex, setMakePostModal } = postsSlice.actions

const setPostsOpen = (posts: PostType[], index: number) => {
	const newPosts = posts.map((post, i) => {
		if (i === index || i === index + 1) {
			return { ...post, isOpen: true }
		}
		return { ...post, isOpen: false }
	})
	return newPosts
}

export const loadPosts = () => {
	return async (dispatch: Dispatch) => {
		// const response = await call('GET', '/posts')
		const response = dummyData
		dispatch(setPosts(setPostsOpen(response, 0)))
	}
}

export const turnPage = (index: number) => {
	return (dispatch: Dispatch, getState: () => { posts: PostsState }) => {
		const { posts } = getState().posts
		dispatch(setPosts(setPostsOpen(posts, index)))
	}
}

export default postsSlice.reducer
