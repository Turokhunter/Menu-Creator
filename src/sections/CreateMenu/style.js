import styled from 'styled-components';

export const HeaderSizing = styled.div `
    /* display: flex; */
    /* align-items: center; */
    z-index: 10;
    height: 50px;
`;

export const BodySizing = styled.div `
    width : 510px;
    height: ${props => props.height};
    overflow: auto;
`;
export const FootSizing = styled.div `
    margin-top: 1rem;
    padding: 1rem;
    background-color: rgb(235, 195, 64);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
`;
