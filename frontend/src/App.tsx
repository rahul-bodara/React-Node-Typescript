import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import { Table } from 'react-bootstrap'

function App ()  {
  const [City, setCity] : any = useState("");
  const [Data, setData] : any = useState([]);
  const [Temp, setTem] : any = useState([]);
  const [oldData , setOldData] : any = useState([])

  const onSubmit = () => {
    const config : any = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
    };
    fetch(
      `http://127.0.0.1:3000/${City}`
    ) .then(response => response.json())
    .then(data => {
      const data1 = JSON.parse(data.message)
      if(data1.message === 'city not found'){
        alert('This city is not found')
        return
      }else{

        Axios.post(`http://127.0.0.1:3000/${City}`,data1)
        .then(res =>{
          setOldData(res.data.message)
        })
        .catch(err => console.log(err))
        setData(data1.weather);
        setTem(data1);
      }
    })
    .catch(err => alert(err))
  };
  return (
    <div className="App">
      <input
        name="city"
        value={City}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={onSubmit}>Submit</button>
      { <div>
      {Data && Data.length > 0 &&
            Data.map((row : any, index : any) => (
              <div>
                  <h2>Weather : {row.main}</h2>
                  <h2>Description : {row.description}</h2>
                </div>
            ))}
      </div>
      }
      {Temp.main ?  (
        <div>
          <h3>Temprature :  {Temp.main.temp}</h3>
          <h3>Country :  {Temp.sys.country}</h3>

          <h3>City :  {Temp.name}</h3>
          </div>
      ) : ''}

      {/* table for old data */}
      {oldData.length ? (
      <Table striped bordered hover responsive >
        <thead>
          <tr>
            <th>Name</th>
            <th>weather</th>
            <th>temperature</th>
            <th>description</th>
            <th>speed</th>
            <th>date</th>
            <th>country</th>
          </tr>
        </thead>
        <tbody>
          {oldData.map((data : any,index : any)=>
            <tr key={index}>
              <td>{data.cityName}</td>
              <td>{data.weather}</td>
              <td>{data.temperature}</td>
              <td>{data.description}</td>
              <td>{data.speed}</td>
              <td>{data.date.split('T')[0].split("-").reverse().join("-")}</td>
              <td>{data.country}</td>
            </tr>
          )}
        </tbody>
      </Table>
      ):''}
    </div>
  );
}

export default App;
