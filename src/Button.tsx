type ButtonPropsType = {
	title: string
	onClick?:()=> void
	isDisabled?: boolean
	classes?: string
}

export const Button = ({title, onClick, isDisabled, classes}: ButtonPropsType) => {
	return (
		<button disabled={isDisabled} onClick={onClick} className={classes}>{title}</button>
	)
}
