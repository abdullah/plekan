var buttons = {
	stick: {
		italic:{
			class:"fa fa-italic",
			type:"d",
			method: function (exec,selection,vm) {
				console.log(1)
			}
		}
	},
	dynamic: {
		bold: {
			class:"fa fa-bold",
			type:"s",
			method: function (exec,selection,vm) {
				console.log(1)
			}
		}
	}

}

export default buttons;