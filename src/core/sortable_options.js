const common = {
  handle: '.plekan-move-row',
  animation: 150,
};
export const arenaSortableOptions = {
  ...common,
  group: {
    name: 'arena',
    pull: false,
  },
};

export const listSortableOptions = {
  ...common,
  group: {
    name: 'arena',
    pull: 'clone',
  },
};
