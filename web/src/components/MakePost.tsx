import React, { FC, useState } from 'react'
import Box from './Box'
import Text from './Text'
import call from '../store/api'
import { useAppDispatch } from '../hooks/redux'
import { showMessageWithTimeout, showErrorMessageWithTimeout } from '../store/slice/alert'
import { loadPosts, setMakePostModal } from '../store/slice/posts'
import ReactMarkdown from 'react-markdown'
import { Button } from './Button'

const MarkDownComponent: FC<{ value: string }> = ({ value }) => {
	return (
		<ReactMarkdown
			children={value}
			components={{
				// code({node, className, children, ...restProps }) {
				//   const match = /language-(\w+)/.exec(className || '')
				//   const {ref, ...props} = restProps
				//   return match ? (
				//     <SyntaxHighlighter language={match[1]} PreTag="div" style={docco}>
				//       {String(children).replace(/\n$/, '')}
				//     </SyntaxHighlighter>
				//   ) : (
				//     <code className={className} {...props}>
				//       {children}
				//     </code>
				//   )
				// },
				h1: ({ node, children, ...restProps }) => {
					return <Text className="font-bold text-2xl">{children}</Text>
				},
				li({ node, children, ...props }) {
					return (
						<Text className="list-disc">
							<li>{children}</li>
						</Text>
					)
				},
			}}
		/>
	)
}

const MakePost: FC = () => {
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const dispatch = useAppDispatch()
	const ref = React.createRef<HTMLTextAreaElement>()

	const handleSubmit = () => {
		call('post', '/posts', { title, body })
			.then((res: any) => {
				setTitle('')
				setBody('')
				dispatch(showMessageWithTimeout('Post Created'))
				dispatch(loadPosts())
			})
			.catch((err: any) => {
				dispatch(showErrorMessageWithTimeout('Post Failed'))
				console.log(err)
			})
	}
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Tab') {
			e.preventDefault()

			setBody(body + '        ')
		}
	}

	const handleCancel = () => {
		setTitle('')
		setBody('')
		dispatch(setMakePostModal(false))
	}

	return (
		<div className="flex flex-col w-2/3 h-3/4 bg-page">
			<Text className="font-bold">Make a blog post</Text>

			<input type="text" placeholder="Title" className="border p-1 m-1" value={title} onChange={(e) => setTitle(e.target.value)} />
			<textarea placeholder="Body Text" className="grow border p-1 m-1" value={body} onChange={(e) => setBody(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} ref={ref}></textarea>
			{/* <MarkDownComponent value={body} /> */}
			<div className="flex justify-end w-full">
				<Button text="Submit" className="m-1" onClick={handleSubmit} />
				<Button text="Cancel" className="m-1" onClick={handleCancel} />
			</div>
		</div>
	)
}

export default MakePost
