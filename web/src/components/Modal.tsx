import { FC, ReactElement, forwardRef } from 'react'
type ModalProps = {
	children: ReactElement | ReactElement[]
	show: boolean
}

const Modal: FC<ModalProps> = forwardRef<HTMLDivElement, ModalProps>(({ children, show }, ref) => {
	const hidden = show ? '' : 'hidden'
	return (
		<div ref={ref} className={'fixed top-0 left-0 z-[500] w-full h-full bg-black bg-opacity-50 flex justify-center items-center ' + hidden}>
			{children}
		</div>
	)
})

export default Modal
