import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "../../auth/Auth";
import { BasicButton, PageContainer, StyledForm, ErrorMessage } from "../CommonStyles";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");
	const [password, setPassword] = useState("");
	const { signUp, loading, user } = useUserAuth();
	const navigate = useNavigate();

	if (loading) {
		return <p>Loading...</p>;
	}
	
	// Redirect to home if user is already logged in
	else if (user) {
		navigate("/");
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			await signUp(email, username, password);
			navigate("/");
		} catch (err) {
			setError(err.message);
			console.error(err);
		}
	};

	return (
		<PageContainer>
			<StyledForm>
				<h1> Sign Up </h1>
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
					<label htmlFor="username">
						Username
					</label>
					<input
						id="username"
						type="text"
						label="Create username"
						onChange={(e) => setUsername(e.target.value)}
						required
						placeholder="Username"
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
					Sign Up
				</BasicButton>
			</StyledForm>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<p>
				Already have an account? <Link to="/login">Log in</Link>
			</p>
		</PageContainer>
	)
}

export default Signup