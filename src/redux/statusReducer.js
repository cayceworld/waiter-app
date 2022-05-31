//selectors
export const getStatuses = state => state.statuses;



// action creators
const statusesReducer = (statePart = [], action) => {
  switch (action.type) {

    default:
      return statePart;
  };
};
export default statusesReducer; 