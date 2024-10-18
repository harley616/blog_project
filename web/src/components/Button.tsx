import { debounce } from '@material-ui/core'
import { createRef, FC, ReactNode, RefObject, useCallback, useEffect, useMemo, useState } from 'react'

type ButtonColors = 'normal' | 'scary' | 'happy'

export const Button: FC<{ text: string | ReactNode; className?: string; onClick: () => void; color?: ButtonColors; hintText?: string }> = ({ text, className = '', onClick, color, hintText = '' }) => {
	const [showHintText, setShowHintText] = useState(false)
	const [mouseOn, setMouseOn] = useState(false)
	const handleMouseEnter = () => {
		const then = debounce(() => {
			setShowHintText(false)
		}, 2000)
		setTimeout(() => {
			then()
		}, 2000)
	}

	const handleMouseLeave = () => {
		setMouseOn(false)
	}

	const buttonColorClass = useMemo(() => {
		switch (color) {
			case 'normal':
				return 'bg-white hover:bg-gray-200'
			case 'scary':
				return 'bg-red-200 hover:bg-red-400'
			case 'happy':
				return 'bg-blue-200 hover:bg-blue-400'
			default:
				return 'bg-white hover:bg-gray-200'
		}
	}, [color])

	return (
		<>
			{showHintText && <div className="absolute bottom-0 mb-10 text-gray-100 bg-slate-500 border p-1 rounded">{hintText}</div>}
			<button className={`${buttonColorClass} py-1 px-4 rounded border shadow-md ` + className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => onClick()}>
				{text}
			</button>
		</>
	)
}
