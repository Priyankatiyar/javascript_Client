import styled, { css } from 'styled-components';

const Button = styled.button`
${(props) => props.type === 'Cancel'
&& css`
background: #D0D3D4;
color: black;
padding: 12px;
font-size: 16px;
border-radius: 6px;
border: 1px solid black;
margin-left: 87%;
`};
${(props) => props.disabled === true && props.type === 'Submit' && css`
background: #D0D3D4;
color: #B3B6B7;
padding: 12px;
font-size: 16px;
margin:10px 2px;
border-radius: 6px;
margin-left: 8px;
`};
${(props) => props.disabled === false && props.type === 'Submit' && css`
background: #4CAF50;
color: white;
padding: 12px;
font-size: 16px;
margin-left: 4px 2px;
border-radius: 6px;
`};
`;
export default Button;
