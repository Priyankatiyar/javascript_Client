import { Button } from '@material-ui/core';
import React from 'react';
import { AddDialog } from './components/AddDialog';
import { Navbar } from '../../layouts/components/Navbar';

class Trainee extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  render() {
    const { isOpen } = this.state;
    return (
      <>
        <Navbar />
        &nbsp;&nbsp;&nbsp;
        <div>
          <Button variant="outlined" color="primary" href="#outlined-buttons" onClick={() => this.setState({ isOpen: true })}>Add Trainee</Button>
        </div>
        <AddDialog open={isOpen} />
      </>
    );
  }
}

export default Trainee;
