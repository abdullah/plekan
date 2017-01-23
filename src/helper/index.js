import store from 'src/store'

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
// http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};


/*
* Source : http://stackoverflow.com/questions/2234979/how-to-check-in-javascript-if-one-element-is-contained-within-another
*/
export const childOf = (/*child node*/c, /*parent node*/p) => { //returns boolean
  try{
  	while((c=c.parentNode)&&c!==p); 
  	return !!c; 
  }catch(err){
  	return false;
  }
}

/**
 * Selo selectionend event'ini destekler Native olarak bu event
 * desteklenmez Selo window'a eşittir
 *
 * Selo hakkında daha fazlası için : /src/core/plekan_editor.js
 *
 * document.execCommand çalıştırılmadan önce daha önceden kayıt edilmiş
 * selection restore edilmelidir.
 * @param  {String}   cmd
 * @param  {Any}      val
 * @return {void}
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
 */
export const exec = (cmd,val = null) =>  {
    store.state.selo.restoreSelection(store.state.sel)
    document.execCommand(cmd,false,val)
    setActiveEditorButtons()
}

export const getParents = (el) =>{
  var a = el;
  var parents = [];
  
  while (a) {
      parents.unshift(a);
      a = a.parentNode;
  }
  return parents;
}

export const hasParent = (el,parentClassName) =>{
  let parents = getParents(el)
  let hasParent = null

  Object.keys(parents).map((e,i)=>{
    let cl = parents[i];
    if (cl.className) {
      if (cl.className.indexOf(parentClassName) != -1) {
        hasParent = cl
      }
    }
  })

  return hasParent

  }

export const setActiveEditorButtons = () => {

      let el = store.state.selo.selection.focusNode.parentNode;
      let parents = getParents(el);

      var allAnchorTag = document.getElementsByTagName('a')

      Object.keys(allAnchorTag).map((index) => {
        allAnchorTag[index].classList.remove('active')
      })

     parents.map((e)=> {
      
        var sc = document.querySelector('a[data-tagname="'+ e.tagName +'"]')
        if (sc) {
          sc.classList.add('active')
        }
      })
}