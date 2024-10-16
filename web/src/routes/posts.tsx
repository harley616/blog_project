import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { loadPosts, PostType, turnPage } from '../store/slice/posts'
import Box from '../components/Box'
import Text from '../components/Text'
import MakePost from '../components/MakePost'
import { Button } from '../components/Button'

const ActivePost: FC<{ post: PostType }> = ({ post }) => {
	return (
		<div className="w-[30rem] h-[45rem] bg-page p-4 flex flex-col">
			<div className="flex">
				<Text className="grow">{post.title}</Text>
				<Text>{new Date(post.date).toDateString()}</Text>
			</div>
			<Text>{post.body}</Text>
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
			return [...posts, { _id: '0', title: 'The End', body: 'There is no more content after this :(', date: 0, isOpen: false }]
		}
		return posts
	}, [posts])

	const shouldRenderDummyPage = useMemo(() => {
		if (posts.length % 2 !== 0 && active === posts.length - 1) {
			return true
		} else if (active === posts.length - 2) {
			return true
		}
		return false
	}, [posts])

	useEffect(() => {
		dispatch(turnPage(active))
	}, [active, dispatch])

	useEffect(() => {
		dispatch(loadPosts())
	}, [dispatch])

	const turnPageForward = useCallback(() => {
		setActive((prev) => (prev + 2) % paddedPosts.length)
	}, [paddedPosts.length])

	const turnPageBack = useCallback(() => {
		setActive((prev) => (prev + paddedPosts.length - 2) % paddedPosts.length)
	}, [paddedPosts.length])

	console.log(paddedPosts.length)

	return (
		<div className="flex grow">
			<div className="w-full flex flex-col justify-center">
				<Text>This is my collection of blog posts</Text>
				<div className="flex grow m-auto w-full justify-center">
					{paddedPosts.map((post, i) => {
						if (post.isOpen || (shouldRenderDummyPage && post._id === '0')) {
							return (
								<div key={post._id} className="h-full flex">
									{i === 0 && <div className="bg-page-dark w-[4px] h-[45rem] " />}
									<ActivePost post={post} />
									{(i % 2 == 0 || i === paddedPosts.length - 1) && <div className="bg-page-dark w-[4px] h-[45rem] " />}
								</div>
							)
						} else {
							if (i % 2) {
								return (
									<div key={post._id} className="h-full flex">
										{i > active && <div className="bg-page w-[4px] h-[45rem] " />}
										<div className="bg-page-dark w-[4px] h-[45rem] " />
										{i < active && <div className="bg-page w-[4px] h-[45rem] " />}
									</div>
								)
							}
						}
					})}
				</div>
				<div className="flex justify-around">
					<Button text="Turn Page Back" onClick={turnPageBack} />
					<Button text="Turn Page" onClick={turnPageForward} />
				</div>
			</div>
		</div>
	)
}

export default Posts
