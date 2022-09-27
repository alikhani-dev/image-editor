const preview = document.querySelector(`#preview`)
const filtersBox = document.querySelector('#filters')
const rotateSlider = document.querySelector(`#rotate`)
const previewFlip = document.querySelector(`#preview-flip`)
const previewScale = document.querySelector(`#preview-scale`)
const brightnessSlider = document.querySelector(`#brightness`)
const rotateSliderValue = document.querySelector(`#rotate-value`)
const brightnessSliderValue = document.querySelector(`#brightness-value`)

const filterValues = {
	none: `unset`,
	blur: `blur(2px)`,
	sepia: `sepia(1)`,
	invert: `invert(1)`,
	saturate: `saturate(2)`,
	blend: `url(#blendSvg)`,
	opacity: `opacity(0.5)`,
	contrast: `contrast(2)`,
	grayscale: `grayscale(1)`,
	picture: `url(#pictureSvg)`,
	convolve: `url(#convolveSvg)`,
	'hue-rotate': `hue-rotate(90deg)`
}

const initFilter = () => {
	Object.keys(filterValues)
		.map(createFilter)
		.forEach(i => filtersBox.appendChild(i))
}

const createFilter = type => {
	const wrapper = document.createElement('div')

	const thumb = document.createElement('div')
	thumb.addEventListener('click', handleFilter)
	thumb.classList.add('thumb')

	const image = document.createElement('img')
	image.src = './assets/img/template.jpg'
	image.alt = type
	image.id = type

	const span = document.createElement('span')
	span.innerText = type

	thumb.appendChild(image)
	wrapper.appendChild(thumb)
	wrapper.appendChild(span)

	return wrapper
}

const handleRotate = () => {
	const rotate = rotateSlider.valueAsNumber
	rotateSliderValue.innerText = rotate

	const rotateToRadian = rotate * (Math.PI / 180).toFixed(5)

	const scale = Math.abs(Math.sin(rotateToRadian).toFixed(5)) + Math.abs(Math.cos(rotateToRadian).toFixed(5))
	preview.style.transform = `rotate(${rotate}deg) scale(${scale})`
}

const handleBrightness = () => {
	const brightness = brightnessSlider.valueAsNumber
	brightnessSliderValue.innerText = brightness

	const prevFilters = preview.style.filter.replace(/brightness\([0-9\.]+\)/gm, '')
	const newFilter = prevFilters + ` brightness(${brightness})`

	preview.style.filter = newFilter
}

const handleFilter = e => {
	const filter = e.target.id

	const prevBrightnessValue = preview.style.filter.split('brightness')[1]
	preview.style.filter = `${filterValues[filter]} ${prevBrightnessValue ? `brightness${prevBrightnessValue}` : ''}`
}

const handleFlip = flip => {
	let prevScaleX = previewFlip.style.transform.match(/(?<=scaleX\()[1\-]{1,2}/)
	prevScaleX = prevScaleX ? prevScaleX[0] : '1'

	let prevScaleY = previewFlip.style.transform.match(/(?<=scaleY\()[1\-]{1,2}/)
	prevScaleY = prevScaleY ? prevScaleY[0] : '1'

	const newVerticalFlip = `scaleX(${prevScaleX}) scaleY(${-prevScaleY})`
	const newHorizontalFlip = `scaleX(${-prevScaleX}) scaleY(${prevScaleY})`

	previewFlip.style.transform = flip === 'vertical' ? newVerticalFlip : newHorizontalFlip
}

const handleMouseLeave = () => {
	previewScale.style.transform = 'scale(1)'
}

const handleMouseEnter = () => {
	previewScale.style.transform = 'scale(2)'
}

const handleMouseMove = e => {
	const imageWidth = previewScale.offsetWidth
	const imageHeight = previewScale.offsetHeight
	const imageOffsetTop = previewScale.offsetTop
	const imageOffsetLeft = previewScale.offsetLeft
	const pageX = e.pageX
	const pageY = e.pageY

	const xPos = pageX - imageOffsetLeft
	const yPos = pageY - imageOffsetTop

	if (xPos >= 0 && yPos >= 0) {
		const xPerc = (xPos / imageWidth).toFixed(5) * 100 + '%'
		const yPerc = (yPos / imageHeight).toFixed(5) * 100 + '%'

		previewScale.style.transformOrigin = `${xPerc} ${yPerc}`
	}
}

document.addEventListener('DOMContentLoaded', initFilter)