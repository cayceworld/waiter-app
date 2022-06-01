import { API_URL } from "../config";

//selectors
export const getAllTables = ({ tables }) => tables;
export const getTableById = ({ tables }, tableId) => 
  tables.find(table => table.id === tableId);
export const getStatuses = state => state.statuses;

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const EDIT_TABLE = createActionName('EDIT_TABLE');
const UPDATE_TABLES = createActionName('UPDATE_TABLES');


// action creators
export const editTable = payload => ({ type: EDIT_TABLE, payload });
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const fetchTables = () => {
  console.log("fetchTables")
  return (dispatch) => {
    fetch(`${API_URL}/tables`)
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)));
  }
};
export const editTableRequest = (editedTable) => {
  console.log("editedTable",editedTable);
  console.log("editTableRequest")
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedTable),
    };
    fetch(`${API_URL}/tables/${editedTable.id}`, options)
      .then(() => dispatch(editTable(editedTable)))
  }
}

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case EDIT_TABLE:
      return statePart.map(table => (table.id === action.payload.id ? { ...table, ...action.payload } : table))
    case UPDATE_TABLES:
      return [...action.payload];
    default:
      return statePart;
  };
};

export default tablesReducer;