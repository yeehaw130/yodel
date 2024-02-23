import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const onSubmit = async (e) => {
		e.preventDefault()

		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
				navigate("/login")
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	}

	return (
		<main >
			<section>
				<div>
					<div>
						<h1> Sign Up </h1>
						<form>
							<div>
								<label htmlFor="email-address">
									Email address
								</label>
								<input
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
									type="password"
									label="Create password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									placeholder="Password"
								/>
							</div>

							<button
								type="submit"
								onClick={onSubmit}
							>
								Sign up
							</button>
						</form>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Signup;
