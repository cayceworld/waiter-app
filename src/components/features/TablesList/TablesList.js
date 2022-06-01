import { useSelector } from 'react-redux';
import { getAllTables } from '../../../redux/tablesReducer';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'


const TablesList = () => {

  const TablesList = useSelector(getAllTables);


  if (TablesList.length === 0) return <div>
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
  return (
    <div >
      {TablesList.map(table =>
        <div key={table.id} className="d-flex  border-bottom py-2">
          <h4 className="col-3 col-md-2">{table.title}</h4>
          <div className="d-flex col-4 col-md-8 pt-1">
            <h6 className="card-subtitle  mt-0">Status:</h6>
            <small className="font-weight-normal px-1 " >{table.status}</small>
          </div>
          <Link key={table.id} to={"/table/" + table.id} >
            <button type="button" className="btn btn-primary" >Show more</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default TablesList;