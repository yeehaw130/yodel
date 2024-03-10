import styled from 'styled-components';

export const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
`;

export const BasicButton = styled.button`
	margin: 10px;
	padding: 10px;
`;

export const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 85%;

	input {
		margin: 10px;
		padding: 10px;
	}
	button {
		margin: 10px;
		padding: 10px;
	}
`;

export const ErrorMessage = styled.div`
    position: absolute;
    bottom: 10px;
`;

export const TitleText = styled.span`
	font-size: 48px;
	font-weight: bold;
`;

export const DividedList = styled.ul` 
    list-style-type: none;
    & > li {
        padding-bottom: 30px;
        padding-top: 30px;
    }
    & > li:not(:last-child) {
        border-bottom: 1px solid #ffffff50; 
    }
`;

export const Widget = styled.div`
    text-align: start;
    background-color: #121212;
    padding: 30px;
    border-radius: 12px;
    margin: 15px 15px 0px 0px;
	flex-grow: 1;
`;