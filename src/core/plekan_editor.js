import Selo from 'selo'
import {setActiveEditorButtons} from 'helper'
import globalElements from 'core/globalElements'

globalElements.editorStart = () => {

	globalElements.selo = new Selo({
		els:"[contenteditable]", // if you don't set el property, this property set as body by Selo
		log:true, // if you don't want to see log you can pass log:true
	});

	var left,top,width,gb,tw,th;

	globalElements.editorElement = document.querySelector('.plekan-editor');
	globalElements.editorElementDynamic = document.querySelector('.dynamic-editor');
	globalElements.editorElementStable = document.querySelector('.stable-editor');

	if (globalElements.editorElementDynamic) {
		tw 		= globalElements.editorElementDynamic.clientWidth;
		th 		= globalElements.editorElementDynamic.clientHeight;
	}
	
	globalElements.sel = null;

	document.addEventListener('selectionEnd',function () {

		globalElements.editorElementDynamic.classList.add('active');
		

		// This operation disabled overflow for  out of window

		var _left = left+(width/2)-(tw/2);
		var _top = top-th;
		
		_left = _left <= 10 ? 10: _left;
		_top = _top <= 10 ? 10: _top;
	
		var possibleLeft = window.innerWidth - tw - 10;

		_left = _left > possibleLeft  ? possibleLeft : _left;

		globalElements.editorElementDynamic.style.left = _left+'px';
		globalElements.editorElementDynamic.style.top = _top+'px'

		setActiveEditorButtons();
		globalElements.sel = globalElements.selo.saveSelection()

	})

	document.addEventListener('selectionStart',function () {
		gb 		= globalElements.selo.getPositionRange().getBoundingClientRect;


		left 	= gb.left
		top 	= gb.top
		width 	= gb.width

		if (globalElements.editorElementDynamic.className.indexOf('active') == -1) {
			globalElements.editorElementDynamic.style.left = left+(width/2)-(tw/2)+'px';
			globalElements.editorElementDynamic.style.top = top-th+'px';
		}

		globalElements.sel = globalElements.selo.saveSelection()

	});

	document.addEventListener('selectionBeforeStart',function () {
	});
	
}


