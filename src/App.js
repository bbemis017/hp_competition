import React from 'react';
import {
  Container,
  Row
} from 'react-bootstrap';

import Student from './components/student';

function App() {
  return (
    <Container>
      <Row>
        <div className="col-md-4">
          <Student id={0} />
        </div>
        <div className="col-md-4">
          <h1>Compete</h1>
        </div>
        <div className="col-md-4">
          <Student id={1} />
        </div>
      </Row>
    </Container>
  );
}

export default App;
