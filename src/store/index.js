var uuid = require('uuid');


export default {
  debug: true,
  state: {
    languages: [],
    currentLanguge: "",
    translateLanguage: "",
    moduleList: [],
    rows: [],

    translateMode:false,
    vm:null
  },
  init (type, data) {
    this.state[type] = data;
  },
  /*----------------------------------------------*/
  addRow(r,i){
    let tmp = JSON.parse(JSON.stringify(r));
    tmp.index = uuid.v1();
    
    if (isNaN(i)) {
      this.state.rows.push(tmp);
    }else{
      this.state.rows.splice(i, 0, tmp);
    }

   this.state.vm.$plekanEvent.onAdd(tmp)
  },
  updateRows(index, row){
    let tmp = JSON.parse(JSON.stringify(this.state.rows));
    tmp[index] = row
    this.state.rows = tmp
    this.state.vm.$plekanEvent.onUpdate(tmp,index)
  },
  deleteRow(r,i){
    var tmp = this.state.rows.splice(i, 1);
    this.state.vm.$plekanEvent.onDelete(tmp,i)
  },
  dublicateRow(r,i){
    this.addRow(r,i)
    this.state.vm.$plekanEvent.onDuplicate(r,i)
  },
  sortRows(_new,old){
    this.state.rows.move(old,_new)
    this.state.vm.$plekanEvent.onSort(_new,old)
    // 
  },
  /*----------------------------------------------*/
  changeTranslateMode(){
    this.state.translateMode = !this.state.translateMode;
  }
}

