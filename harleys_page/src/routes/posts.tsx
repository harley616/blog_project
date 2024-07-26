import { CSSProperties, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { loadPosts, PostType } from '../store/slice/posts'
import Box from '../components/Box'
import Text from '../components/Text'
import MakePost from '../components/MakePost'

const Post: FC<{
	post: PostType
	index: number
	active: number
	setActive: Dispatch<SetStateAction<number>>
}> = ({ post, index, active, setActive }) => {
	const postsLength = useAppSelector((state) => state.posts.posts).length
	const [zIndex, setZIndex] = useState(index)
	const PostClass: CSSProperties = {
		position: 'absolute',
		zIndex: zIndex,
		top: 0,
		bottom: 0,
		margin: 'auto',
		width: '30rem',
	}

	const handleFocus = () => {
		setActive(index)
		setZIndex(postsLength)
	}

	useEffect(() => {
		if (index !== active) {
			setZIndex(active < index ? postsLength - index : index)
		}
	}, [active, index, postsLength])
	return (
		<div className="relative h-3/4 w-16">
			<div style={PostClass} onMouseEnter={() => handleFocus()}>
				<Box className="h-full">
					<div className="flex">
						<Text className="grow">{post.title}</Text>
						<Text>{new Date(post.date).toDateString()}</Text>
					</div>
					<Text>{post.body}</Text>
				</Box>
			</div>
		</div>
	)
}

const Posts: FC = () => {
	const dispatch = useAppDispatch()
	const posts = useAppSelector((state) => state.posts.posts)
	const [active, setActive] = useState<number>(posts.length - 1)
	const auth = useAppSelector((state) => state.auth.loggedIn)

	useEffect(() => {
		dispatch(loadPosts())
	}, [dispatch])
	return (
		<div className="flex grow">
			<Box className="w-2/3 flex flex-col">
				<Text>This is my collection of blog posts</Text>
				<div className="flex grow overflow-scroll">
					{posts.map((post, i) => (
						<Post post={post} key={post._id} index={i} active={active} setActive={setActive} />
					))}
				</div>
			</Box>
			{auth && <MakePost />}
		</div>
	)
}

export default Posts
