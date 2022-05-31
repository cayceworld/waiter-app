import { useSelector } from 'react-redux';
import { getAllTables } from '../../../redux/tablesReducer';
import { Link } from 'react-router-dom';



const TablesList = () => {

  const TablesList = useSelector(getAllTables);
  //console.log(TablesList);

  return (
    <div >
      {TablesList.map(table =>
        <div key={table.id} className="d-flex  border-bottom py-2">
          <h4 className="col-1">{table.title}</h4>
          <div className="d-flex col-9 pt-1">
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