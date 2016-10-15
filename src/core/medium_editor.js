import Selo from 'selo'
import selectionPolify from 'helper/selectionPolify'



window.onload = () => {
	
	selectionPolify.start();


	var el = document.getElementById('_plekan');

	window.selo = new Selo({
		els:"[contenteditable]", // if you don't set el property, this property set as body by Selo
		log:true, // if you don't want to see log you can pass log:true
	});

	var left,top,width,gb,tw,th;

	window.editorElement = document.querySelector('.editor');

	if (window.editorElement) {
		tw 		= editorElement.clientWidth;
		th 		= editorElement.clientHeight;
	}
	window.sel = null;

	document.addEventListener('selectionEnd',function () {
		// @TODO : Disabled overflow out of window
		editorElement.classList.add('active');


		editorElement.style.left = left+(width/2)-(tw/2)+'px';
		editorElement.style.top = top-th+'px';

		sel = selo.saveSelection()

	})

	document.addEventListener('selectionStart',function () {
		gb 		= selo.getPositionRange().getBoundingClientRect;

		left 	= gb.left
		top 	= gb.top
		width 	= gb.width

		if (editorElement.className.indexOf('active') == -1) {
			editorElement.style.left = left+(width/2)-(tw/2)+'px';
			editorElement.style.top = top-th+'px';
		}
	});

	document.addEventListener('selectionBeforeStart',function () {
	});
	

}


