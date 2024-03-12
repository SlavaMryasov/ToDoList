type ButtonPropsType = {
	title: string
	onClick?:()=> void
	isDisabled?: boolean
}

export const Button = ({title, onClick, isDisabled}: ButtonPropsType) => {
	return (
		<button disabled={isDisabled} onClick={onClick}>{title}</button>
	)
}
