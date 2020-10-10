import React from 'react';
import {
  Container,
  Row
} from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Row>
        <div className="col-md-4">
          <h1>Student 1</h1>
        </div>
        <div className="col-md-4">
          <h1>Compete</h1>
        </div>
        <div className="col-md-4">
          <h2>Student 2</h2>
        </div>
      </Row>
    </Container>
  );
}

export default App;
