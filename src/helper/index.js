
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

Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};



/*
* Source : http://stackoverflow.com/questions/2234979/how-to-check-in-javascript-if-one-element-is-contained-within-another
*/
window.childOf = (/*child node*/c, /*parent node*/p) => { //returns boolean
  try{
  	while((c=c.parentNode)&&c!==p); 
  	return !!c; 
  }catch(err){
  	return false;
  }
}



window.getParents = (el) =>{
  var a = el;
  var parents = [];
  
  while (a) {
      parents.unshift(a);
      a = a.parentNode;
  }
  return parents;
}

window.hasParent = (el,parentClassName) =>{
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



window.setActiveEditorButtons = () => {

      let el = selo.selection.focusNode.parentNode;
      let parents = getParents(el);

      var allAnchorTag = document.getElementsByTagName('a')

      // console.log(allAnchorTag,parents)
      Object.keys(allAnchorTag).map((index) => {
        allAnchorTag[index].classList.remove('active')
      })

     parents.map((e)=> {
        
        if (e.tagName == 'A') {
          // this.linkText = e.href;
        }

        var sc = document.querySelector('a[data-tagname="'+ e.tagName +'"]')
        if (sc) {
          sc.classList.add('active')
          console.log(sc)
        }
      })
}