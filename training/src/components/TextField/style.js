import styled, { css } from 'styled-components';

const Div = styled.div`2%;`;

const Error = styled.p`color: red;`;

const Input = styled.input`
width: 95%;
padding: 0.7%;
border: 1px solid gray;
border-radius: 5px;
color: solid darkgray;

${(props) => props.error
&& css`
border: 1px solid red;
color: red;
`};
}

${(props) => (props.value && !props.disabled && !props.error)
&& css`
border: 1px solid orange;
color: black;
`};
}`;

export { Div, Error, Input };
