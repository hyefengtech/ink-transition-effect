document.addEventListener("DOMContentLoaded", () => {
	const modalTrigger = document.querySelector(".cd-modal-trigger"),
		transitionLayer = document.querySelector(".cd-transition-layer"),
		transitionBackground = transitionLayer.querySelector(".bg-layer"),
		modalWindow = document.querySelector(".cd-modal");

	const frameProportion = 1.70,
		frames = 25;

	let resize;

	function setLayerDimensions() {
		const windowWidth = window.innerWidth,
			windowHeight = window.innerHeight,
			condition = windowWidth / windowHeight > frameProportion;
		let layerHeight, layerWidth;

		layerWidth = `${condition ? windowWidth : windowHeight*1.2*frameProportion}`,
		layerHeight = `${condition ? layerWidth/frameProportion : windowHeight*1.2}`,

		transitionBackground.style.width = `${layerWidth*frames}px`,
		transitionBackground.style.height = `${layerHeight}px`,

		resize = false;
	}

	function animationEndHandler() {
		const animEnd = () => {
			transitionLayer.classList.contains("closing") && (
				transitionLayer.classList.remove("closing", "opening", "visible")
			)
		};

		transitionBackground.addEventListener("animationend", animEnd),
		transitionBackground.addEventListener("webkitAnimationend", animEnd)
	}

	setLayerDimensions(),
	animationEndHandler(),

	modalTrigger.addEventListener("click", e => {
		const delay = document.querySelector(".no-cssanimations") ? 0 : 600;
		e.preventDefault(),
		transitionLayer.classList.add("visible", "opening");
		setTimeout(() => {
			modalWindow.classList.add("visible")
		}, delay)
	}),

	modalWindow.querySelector(".modal-close").addEventListener("click", e => {
		e.preventDefault(),
		transitionLayer.classList.add("closing"),
		modalWindow.classList.remove("visible")
	}),

	window.addEventListener("resize", () => {
		resize || (
			resize = true,
			(!window.requestAnimationFrame) ? setTimeout(setLayerDimensions, 300) : window.requestAnimationFrame(setLayerDimensions)
		)
	})

})
