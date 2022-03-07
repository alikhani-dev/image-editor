const preview = document.querySelector('#preview')
const previewScale = document.querySelector('#preview-scale')
const previewFlip = document.querySelector('#preview-flip')
const brightnessSlider = document.querySelector('#brightness')
const brightnessSliderValue = document.querySelector('#brightness-value')
const rotateSlider = document.querySelector('#rotate')
const rotateSliderValue = document.querySelector('#rotate-value')

const handleRotate = () => {
	const rotate = Number(rotateSlider.value)
	rotateSliderValue.innerText = rotate
  //Fix rotate bug 
	preview.style.transform = `rotate(${rotate}deg)`
}

const handleBrightness = () => {
	const brightness = brightnessSlider.value
	brightnessSliderValue.innerText = brightness

	let style = window.getComputedStyle(preview)
	let current = style.getPropertyValue('filter')

	let reg = new RegExp(`brightness[\\s ]*\\([^\\)]+\\)`)
	const result = current.replace(reg, '')

	if (result === 'none') {
		preview.style.filter = `brightness(${brightness})`
	} else {
		preview.style.filter = `brightness(${brightness}) ${result}`
	}
}

const handleFilter = ({ target }) => {
	const { id: filter } = target

	const filterValue = findFilter(filter)

	if (filterValue === 'none') {
		reset()
	} else {
		preview.style.filter = filterValue
	}
}

const reset = () => {
	preview.style.transform = ''
	preview.style.filter = ''
	brightnessSlider.value = 1
	brightnessSliderValue.innerText = 1
	rotateSlider.value = 0
	rotateSliderValue.innerText = 0
}

const findFilter = filter => {
	// filter: "grayscale" | "sepia" | "invert" | "hue-rotate" | "contrast" | "saturate" | "blur"
	switch (filter) {
		case 'grayscale':
			return 'grayscale(1)'
		case 'sepia':
			return 'sepia(1)'
		case 'invert':
			return 'invert(1)'
		case 'hue-rotate':
			return 'hue-rotate(90deg)'
		case 'contrast':
			return 'contrast(2)'
		case 'saturate':
			return 'saturate(2)'
		case 'blur':
			return 'blur(2px)'
		default:
			return 'none'
	}
}

const handleFlip = flip => {
	let style = window.getComputedStyle(previewFlip)
	let current = style.getPropertyValue('transform')

	if (flip === 'horizontal') {
		current !== 'matrix(-1, 0, 0, 1, 0, 0)'
			? (previewFlip.style.transform = `scaleX(-1)`)
			: (previewFlip.style.transform = `scaleX(1)`)
	} else {
		current !== 'matrix(1, 0, 0, -1, 0, 0)'
			? (previewFlip.style.transform = `scaleY(-1)`)
			: (previewFlip.style.transform = `scaleY(1)`)
	}
}

const handleMouseLeave = () => {
	previewScale.style.transform = 'none'
	previewScale.style.transformOrigin = 'none'
}

const handleMouseMove = e => {
	const imageOffsetTop = previewScale.offsetTop
	const imageOffsetLeft = previewScale.offsetLeft
	const pageX = e.pageX
	const pageY = e.pageY

	const x = pageX - imageOffsetLeft
	const y = pageY - imageOffsetTop

	previewScale.style.transform = `scale(2)`
	previewScale.style.transformOrigin = `${x}px ${y}px`
}
