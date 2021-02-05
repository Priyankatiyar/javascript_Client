/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Mutation } from '@apollo/react-components';
import { DELETE_TRAINEE } from '../../mutation';
import RemoveDialog from './RemoveDialog';

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const prop = this.props;
    return (
      <Mutation mutation={DELETE_TRAINEE}>
        {(deleteTrainee) => (
          <>
            <RemoveDialog deleteTrainee={deleteTrainee} {...prop} />
          </>
        )}
      </Mutation>
    );
  }
}
