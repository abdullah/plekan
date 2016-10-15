let common = {
   handle: ".plekan-move-row",
   animation: 150, 
}
export const arenaSortableOptions = {
    ...common,
    group: {
    	name : "arena",
    	pull: false,
        put: ['list']
    },
}

export const listSortableOptions = {
    ...common,
    group: {
    	name : "arena",
    	pull : 'clone',
    },
}