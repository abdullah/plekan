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
	window.editorElementDynamic = document.querySelector('.dynamic-editor');
	window.editorElementStable = document.querySelector('.stable-editor');

	if (window.editorElementDynamic) {
		tw 		= editorElementDynamic.clientWidth;
		th 		= editorElementDynamic.clientHeight;
	}
	
	window.sel = null;

	document.addEventListener('selectionEnd',function () {
		

		editorElementDynamic.classList.add('active');
		

		// This operation disabled overflow for  out of window

		var _left = left+(width/2)-(tw/2);
		var _top = top-th;
		
		_left = _left <= 10 ? 10: _left;
		_top = _top <= 10 ? 10: _top;
	
		var possibleLeft = window.innerWidth - tw - 10;

		_left = _left > possibleLeft  ? possibleLeft : _left;

		editorElementDynamic.style.left = _left+'px';
		editorElementDynamic.style.top = _top+'px'

		sel = selo.saveSelection()

	})

	document.addEventListener('selectionStart',function () {
		gb 		= selo.getPositionRange().getBoundingClientRect;

		left 	= gb.left
		top 	= gb.top
		width 	= gb.width

		if (editorElementDynamic.className.indexOf('active') == -1) {
			editorElementDynamic.style.left = left+(width/2)-(tw/2)+'px';
			editorElementDynamic.style.top = top-th+'px';
		}

		sel = selo.saveSelection()

	});

	document.addEventListener('selectionBeforeStart',function () {
	});
	

}


