import { Icon } from '..'

export const alertIconMapping = () => {
	return {
		success: <Icon name={`SyCheck`} color={`white`} size={21} />,
		warning: <Icon name={`SyWarning`} color={`white`} size={21} />,
		error: <Icon name={`SyError`} color={`white`} size={21} />,
		info: <Icon name={`SyInfoSolid`} color={`white`} size={21} />,
	}
}

export const radioIconMapping = () => {
	return {
		icon: <Icon name={`SyCircle`} size={24} color={`muted`} />,
		checkedIcon: <Icon name={`SyCircleFilled`} size={24} colorDark={`accent`} colorLight={`primary`} />,
	}
}

export const checkboxIconMapping = () => {
	return {
		icon: <Icon name={`Square`} size={24} color={`muted`} />,
		checkedIcon: <Icon name={`SyCheck`} size={24} colorDark={`accent`} colorLight={`primary`} />,
	}
}
