import React, { useRef, useEffect } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./App.css";

function App() {
  const gradeRef = useRef(null);
  const dateRef = useRef(null);
  const weightRef = useRef(null);
  const gradesRef = useFirestore().collection("grades");
  const grades = useFirestoreCollectionData(gradesRef);
  const now = new Date();

  useEffect(() => {
    dateRef.current.valueAsDate = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
    );
  }, [now]);

  const addGrade = (data) => {
    gradesRef.add(data);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const { value: grade } = gradeRef.current;
    const { value: date } = dateRef.current;
    const { value: weight } = weightRef.current;

    addGrade({
      grade,
      date: new Date(date),
      weight,
    });
  };

  return (
    <div className="App">
      <h1>Diet</h1>
      <div className="container">
        <div className="table">
          <h4>History</h4>
          <Table responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Weight</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {grades.map(({ date, grade, weight }) => (
                <tr key={date.seconds}>
                  <td>{date.toDate().toLocaleDateString()}</td>
                  <td>{weight}</td>
                  <td>{grade}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="form">
          <h4>New Grade</h4>
          <Form onSubmit={onFormSubmit}>
            <Form.Group controlId="">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" ref={dateRef} required />
            </Form.Group>
            <Form.Group controlId="">
              <Form.Label>Grade</Form.Label>
              <Form.Control as="select" ref={gradeRef} required>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>F</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="">
              <Form.Label>Weight</Form.Label>
              <Form.Control type="number" step=".1" ref={weightRef} required />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
