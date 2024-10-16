import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { loadPosts, PostType, turnPage } from '../store/slice/posts'
import Box from '../components/Box'
import Text from '../components/Text'
import MakePost from '../components/MakePost'
import { Button } from '../components/Button'

const ActivePost: FC<{ post: PostType }> = ({ post }) => {
	const [inEdit, setInEdit] = useState(false)

	const handleEdit = useCallback(() => {
		setInEdit(true)
	}, [])

	const handleSave = () => {
		console.log('save')
	}

	const handleCancel = () => {
		setInEdit(false)
	}
	return (
		<div className="h-3/4 w-[25rem]">
			<Box className="h-full w-full">
				<div className="flex">
					<Text className="grow">{post.title}</Text>
					<Text>{new Date(post.date).toDateString()}</Text>
				</div>
				<Text>{post.body}</Text>
				<div className="relative">
					{inEdit ? (
						<div className="flex justify-around">
							<Button text="X" onClick={handleCancel} color="scary" />
							<Button text="Save" onClick={handleSave} color="happy" />
							<Button text="Delete" onClick={handleEdit} color="scary" />
						</div>
					) : (
						<Button text="Edit" onClick={handleEdit} color="scary" hintText="this is an edit button" />
					)}
				</div>
			</Box>
		</div>
	)
}

const Posts: FC = () => {
	const dispatch = useAppDispatch()
	const posts = useAppSelector((state) => state.posts.posts)
	const [active, setActive] = useState<number>(0)
	const auth = useAppSelector((state) => state.auth.loggedIn)

	const paddedPosts = useMemo(() => {
		if (posts.length % 2 !== 0) {
			return [...posts, { _id: '0', title: '', body: '', date: 0, isOpen: false }]
		}
		return posts
	}, [posts])

	useEffect(() => {
		dispatch(turnPage(active))
	}, [active, dispatch])
	console.log(active)
	useEffect(() => {
		dispatch(loadPosts())
	}, [dispatch])
	return (
		<div className="flex grow">
			<Box className={`w-${auth ? '2/3' : 'full'} flex flex-col`}>
				<Text>This is my collection of blog posts</Text>
				<div className="flex grow gap-2 overflow-scroll">
					{paddedPosts.map((post, i) => {
						if (post.isOpen) {
							return <ActivePost post={post} key={post._id} />
						} else {
							return <div key={post._id} className={`h-3/4 w-1 border-${i < active ? 'l' : 'r'}-2`} />
						}
					})}
				</div>
				<Button text="Turn Page" onClick={() => setActive((prev) => (prev + 2) % paddedPosts.length)} />
			</Box>
			{auth && <MakePost />}
		</div>
	)
}

export default Posts
