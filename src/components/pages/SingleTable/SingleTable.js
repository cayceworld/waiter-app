import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getTableById,getStatuses, getAllTables } from "../../../redux/tablesReducer";
import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { editTableRequest } from "../../../redux/tablesReducer";
import { useForm } from "react-hook-form";

const SingleTable = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const { id } = useParams();


  const tableData = useSelector(state => getTableById(state, id));

  console.log("tableData:", tableData);

  const [peopleAmount, setPeopleAmount] = useState(tableData.peopleAmount || '');
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(tableData.maxPeopleAmount || '');
  const [bill, setBill] = useState(tableData.bill || '0');

  const [status, setStatus] = useState(tableData.status || '');
  const statuses = useSelector(getStatuses);

  const isFree = status === ("Free");
  const isCleaning = status === ("Cleaning");

  const handleSubmit = () => {
    dispatch(editTableRequest({ id, peopleAmount, maxPeopleAmount, bill, status }));
    navigate('/');
  }


  return (
    <Form onSubmit={validate(handleSubmit)}>
      <h1>{tableData.title}</h1>
      <div className="d-flex py-2" >
        <h5 className="col-1">Status</h5>
        <div className="col-2">
          <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
            <option>Select status...</option>
            {statuses.map(status =>
              <option key={status.statusType}>{status.statusType}</option>)}
          </Form.Select>
        </div>
      </div>
      <div className="d-flex py-2">
        <h5 className="col-1">People</h5>
        <div className="col-auto d-flex">
          <div className="col-2">
            <Form.Control
              {...register("peopleAmount", { min: 0, max: maxPeopleAmount })}
              defaultValue={'0'} value={peopleAmount} onChange={e => setPeopleAmount(e.target.value)} type="number" />
            {errors.peopleAmount && <small className="d-block form-text text-danger mt-2">Value must range from 1 to 10, and can't be more that max amount</small>}
          </div>
          <div className="p-1">/</div>
          <div className="col-2">
            <Form.Control
              {...register("maxPeopleAmount", { min: 0, max: 10 })}
              value={maxPeopleAmount} onChange={e => setMaxPeopleAmount(e.target.value)} type="number" />
            {errors.maxPeopleAmount && <small className="d-block form-text text-danger mt-2">Value can range from 1 to 10</small>}
          </div>
        </div>
      </div>

      {status === "Busy" &&
        <div className="d-flex py-2">
          <h5 className="col-1">Bill</h5>
          <div className="d-flex col-auto">
            <div className="p-1">$</div>
            <Form.Control type="number" value={bill} onChange={e => setBill(e.target.value)} />
          </div>

        </div>}
      <Button variant="primary" type="submit">
        Update
      </Button>


    </Form >
  );
}

export default SingleTable;