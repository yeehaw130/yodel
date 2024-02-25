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
	width: 100px;
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
		width: 100px;
	}
`;

export const ErrorMessage = styled.div`
    position: absolute;
    bottom: 10px;
`;