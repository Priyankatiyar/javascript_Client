/* eslint-disable no-console */
import * as yup from 'yup';

import React from 'react';
import {
  TextField, SelectField, RadioGroup, ButtonField,
} from '../../components';
import { Text } from '../../components/TextField/style';
import {
  selectOptions, radioOptionsCricket, radioOptionsFootball,
} from '../../configs/constants';

class InputDemo extends React.Component {
   schema = yup.object().shape({
     name: yup.string().required('Please Enter your Name').min(3, 'Please enter no less than 3 characters'),
     sport: yup.string().required('Sport is required field '),
     cricket: yup.string().required().when('sport', {
       is: 'cricket',
       then: yup.string().required('What you do is a required field'),
     }),
     football: yup.string().required().when('sport', {
       is: 'football',
       then: yup.string().required('What you do is a required field'),
     }),
   });

   constructor(props) {
     super(props);
     this.state = {
       name: '',
       sport: '',
       cricket: '',
       football: '',
       touched: {
         name: false,
         sport: false,
         cricket: false,
         football: false,
       },
     };
   }

  handleBlur = (field) => () => {
    const { touched } = this.state;
    touched[field] = true;

    this.setState({
      touched,
    }, () => this.getError());
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value }, () => {
      console.log(this.state);
    });
  }

  handleSportChange = (e) => {
    this.setState({ sport: e.target.value }, () => console.log(this.state));

    if (e.target.value === 'Select') {
      this.setState({ sport: '' });
    }
    return e.target.value === 'cricket' ? this.setState({ football: '' }) : this.setState({ cricket: '' });
  }

  handlePositionChange = (e) => {
    const { sport } = this.state;

    return sport === 'cricket' ? this.setState({ cricket: e.target.value }, () => console.log(this.state)) : this.setState({ football: e.target.value }, () => console.log(this.state));
  }

  RadioOption = () => {
    let { radioValue } = this.state;
    const { sport } = this.state;
    if (sport === 'cricket') {
      radioValue = radioOptionsCricket;
    } else if (sport === 'football') {
      radioValue = radioOptionsFootball;
    }
    return (radioValue);
  };

  getError = (field) => {
    const { touched } = this.state;

    if (touched[field] && this.hasErrors()) {
      try {
        this.schema.validateSyncAt(field, this.state);
      } catch (err) {
        return err.message;
      }
    }
    return true;
  };

  hasErrors = () => {
    console.log('inside Haserr', this.state);
    try {
      this.schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched, [field]: true,
      },
    });
  }

  render() {
    const { sport } = this.state;
    console.log('hasErr', this.hasErrors());

    return (
      <>
        <div>

          <Text><p>Name</p></Text>
          <TextField
            error={this.getError('name')}
            onChange={this.handleNameChange}
            onBlur={() => this.isTouched('name')}
          />

          <Text>
            <p>Select the game you play?</p>
          </Text>
          <SelectField
            defaultOptions="Select"
            onChange={this.handleSportChange}
            options={selectOptions}
            error={this.getError('sport')}
            onBlur={() => this.isTouched('sport')}
          />
          <div>
            {
              (sport === '' || sport === 'Select') ? '' : (
                <>
                  <p><b>What you do?</b></p>
                  <RadioGroup
                    options={this.RadioOption()}
                    onChange={this.handlePositionChange}
                    error={this.getError(sport)}
                    onBlur={() => this.isTouched(sport)}
                  />
                </>
              )
            }
          </div>
          <div align="right">
            <ButtonField value="Cancel" onClick />
            <ButtonField value="Submit" disabled={this.hasErrors()} onClick />
          </div>
        </div>
      </>
    );
  }
}

export default InputDemo;
