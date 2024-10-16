import { FC, ReactElement } from 'react'

const Box: FC<{
	className?: string
	children: ReactElement | ReactElement[]
}> = ({ children, className }) => {
	return <div className={'border rounded-sm shadow bg-inherit ' + className}>{children}</div>
}

export default Box
