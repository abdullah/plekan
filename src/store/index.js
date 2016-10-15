var uuid = require('uuid');


export default {
  debug: true,
  state: {
    languages: [],
    currentLanguge: "",
    translateLanguage: "",
    moduleList: [],
    rows: []
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
  },
  updateRows(index, row){
    // console.log("update",index,row)
    let tmp = JSON.parse(JSON.stringify(this.state.rows));
    tmp[index] = row
    this.state.rows = tmp
  },
  deleteRow(r,i){
    this.state.rows.splice(i, 1);
  },
  dublicateRow(r,i){
    this.addRow(r,i)
  },
  sortRows(_new,old){
    this.state.rows.move(_new,old)
  }
  /*----------------------------------------------*/
}

