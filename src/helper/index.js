
import store from 'src/store';

/* eslint-disable */
Element.prototype.remove = function () {
  this.parentElement.removeChild(this);
};

/* eslint-disable */
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
};

// http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
Array.prototype.move =  function (oldIndex, newIndex) {
  if (newIndex >= this.length) {
    var k = newIndex - this.length;
    while (k-- + 1) {
      this.push(undefined);
    }
  }
  this.splice(newIndex, 0, this.splice(oldIndex, 1)[0]);
  return this; // for testing purposes
};

/*
* Source : http://stackoverflow.com/questions/2234979/how-to-check-in-javascript-if-one-element-is-contained-within-another
*/
export const childOf = (/* child node*/ c, /* parent node*/ p) => {
  // returns boolean
  try {
    while ((c = c.parentNode) && c !== p);
    return !!c;
  } catch (err) {
    return false;
  }
};
/* eslint-enable */

export const getParents = (el) => {
  let a = el;
  const parents = [];

  while (a) {
    parents.unshift(a);
    a = a.parentNode;
  }
  return parents;
};

export const hasParent = (el, parentClassName) => {
  const parents = getParents(el);
  let hasParents = null;

  Object.keys(parents).map((e, i) => {
    const cl = parents[i];
    if (cl.className) {
      if (cl.className.indexOf(parentClassName) !== -1) {
        hasParents = cl;
      }
    }
    return true;
  });

  return hasParents;
};

export const setActiveEditorButtons = () => {
  const el = store.state.selo.selection.focusNode.parentNode;
  const parents = getParents(el);

  const allAnchorTag = document.getElementsByTagName('a');

  Object.keys(allAnchorTag).map((index) => {
    allAnchorTag[index].classList.remove('active');
    return true;
  });

  parents.map((e) => {
    const sc = document.querySelector(`a[data-tagname="${e.tagName}"]`);
    if (sc) {
      sc.classList.add('active');
    }
    return true;
  });
};

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
export const exec = (cmd, val = null) => {
  store.state.selo.restoreSelection(store.state.sel);
  document.execCommand(cmd, false, val);
  setActiveEditorButtons();
};
