import Selo from 'selo'
import {setActiveEditorButtons} from 'plekan/helper'
import store from 'plekan/store'

store.state.editorStart = () => {

	store.state.selo = new Selo({
		els:"[contenteditable]", // if you don't set el property, this property set as body by Selo
		log:true, // if you don't want to see log you can pass log:true
	});

	var left,top,width,gb,tw,th;

	store.state.editorElement = document.querySelector('.plekan-editor');
	store.state.editorElementDynamic = document.querySelector('.dynamic-editor');
	store.state.editorElementStable = document.querySelector('.stable-editor');

	if (store.state.editorElementDynamic) {
		tw 		= store.state.editorElementDynamic.clientWidth;
		th 		= store.state.editorElementDynamic.clientHeight;
	}
	
	store.state.sel = null;

	document.addEventListener('selectionEnd',function () {

		store.state.editorElementDynamic.classList.add('active');
		

		// This operation disabled overflow for  out of window

		var _left = left+(width/2)-(tw/2);
		var _top = top-th;
		
		_left = _left <= 10 ? 10: _left;
		_top = _top <= 10 ? 10: _top;
	
		var possibleLeft = window.innerWidth - tw - 10;

		_left = _left > possibleLeft  ? possibleLeft : _left;

		store.state.editorElementDynamic.style.left = _left+'px';
		store.state.editorElementDynamic.style.top = _top+'px'

		setActiveEditorButtons();
		store.state.sel = store.state.selo.saveSelection()

	})

	document.addEventListener('selectionStart',function () {
		gb 		= store.state.selo.getPositionRange().getBoundingClientRect;


		left 	= gb.left
		top 	= gb.top
		width 	= gb.width

		if (store.state.editorElementDynamic.className.indexOf('active') == -1) {
			store.state.editorElementDynamic.style.left = left+(width/2)-(tw/2)+'px';
			store.state.editorElementDynamic.style.top = top-th+'px';
		}

		store.state.sel = store.state.selo.saveSelection()

	});

	document.addEventListener('selectionBeforeStart',function () {
	});
	
}


