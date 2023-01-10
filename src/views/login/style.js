import styled from 'styled-components';

export const LoginContainer = styled.div`
    height: 100%;
    background-color: #0d1117;
`;

export const HeaderText = styled.h1`
    color: #f5f5f5;
    text-align: center;
    margin: 20px 0;
`;

export const LoginFormContainer = styled.div`
    padding: 25px 20px;
    align-self: flex-start;
    background-color: #161b22;
    margin: 0 auto;
    width: 350px;
    border-radius: 5px;
`;

export const Label = styled.div`
    font-size: 14px;
    color: #f5f5f5;
`;

export const Input = styled.input`
    border: 1px solid #30363d;
    background-color: #0d1117;
    color: #f5f5f5;
    border-radius: 5px;
    &[disabled] {
        cursor: not-allowed;
        border-color: #c4c4c4;
    }
`;

export const Button = styled.input`
    border-radius: 5px;
`;
