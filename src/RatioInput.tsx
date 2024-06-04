import { DetailedHTMLProps, InputHTMLAttributes, useCallback, useMemo } from 'react'
import { combineClasses } from './functions'
import copyIcon from "./assets/copy-icon.svg"
import "./RatioInput.scss"
import { toast } from 'react-toastify'

export interface RatioInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	solution?: number
	error?: string
}

export default function RatioInput({ error, className, solution, ...props }: RatioInputProps) {
	const solutionStr = useMemo(() => solution ? String(solution) : undefined, [solution])
	const canCopy = solution !== undefined && !error

	const handleCopyClick = useCallback(() => {
		if (!canCopy || !solutionStr) return

		navigator.clipboard.writeText(solutionStr)
		toast("Copied to clipboard")
	}, [canCopy, solutionStr])

	return (
		<div className="ratio-input-container">
			<input className={combineClasses('ratio-input', className)} type="text" placeholder={solutionStr} title={solutionStr} {...props} />
			{canCopy && (
				<button className="copy-button" type="button" onClick={handleCopyClick}>
					<img src={copyIcon} alt="copy" />
				</button>
			)}
			{error && <span className="ratio-input-error">{error}</span>}
		</div>
	)
}
