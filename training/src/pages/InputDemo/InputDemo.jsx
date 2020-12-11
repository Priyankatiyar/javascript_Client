/* eslint-disable no-console */
import React from 'react';
import { TextField } from '../../components';
import { Text } from '../../components/TextField/style';
import SelectField from '../../components/SelectField';
import RadioGroup from '../../components/RadioGroup/index';
import { selectOptions, radioOptionsCricket, radioOptionsFootball } from '../../configs/constants';

class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
    };
    console.log(this.state);
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

  render() {
    const { sport } = this.state;
    return (
      <>
        <div>
          <Text><p>Name</p></Text>
          <TextField
            onChange={this.handleNameChange}
          />
          <Text>
            <p>Select the game you play?</p>
          </Text>
          <SelectField
            defaultOptions="Select"
            onChange={this.handleSportChange}
            options={selectOptions}
          />
          <div>
            {
              (sport === '' || sport === 'Select') ? '' : (
                <>
                  <p><b>What you do?</b></p>
                  <RadioGroup
                    options={this.RadioOption()}
                    onChange={this.handlePositionChange}
                  />
                </>
              )
            }
          </div>
        </div>
      </>
    );
  }
}
export default InputDemo;
