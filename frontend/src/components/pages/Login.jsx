import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "../../auth/Auth";
import { BasicButton, PageContainer, StyledForm, ErrorMessage } from "../CommonStyles";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { logIn, user, loading } = useUserAuth();
	const navigate = useNavigate();

	if (loading) {
		return <p>Loading...</p>;
	}

	// Redirect to home if user is already logged in
	if (user) {
		navigate("/");
	}

	// Handle form submission for user login
	const onSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			await logIn(email, password);
			navigate("/");
		} catch (err) {
			setError(err.message);
			console.error(err);
		}
	};

	return (
		<PageContainer>
			<StyledForm>
				<h1> Login </h1>
				<div>
					<label htmlFor="email-address">
						Email address
					</label>
					<input
						id="email-address"
						type="email"
						label="Email address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="Email address"
					/>
				</div>
				<div>
					<label htmlFor="password">
						Password
					</label>
					<input
						id="password"
						type="password"
						label="Create password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Password"
					/>
				</div>
				<BasicButton onClick={onSubmit}>
					Login
				</BasicButton>
			</StyledForm>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<p>
				Don't have an account? <Link to="/signup">Sign up</Link>
			</p>
		</PageContainer>
	)
}

export default Login