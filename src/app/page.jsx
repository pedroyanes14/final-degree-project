import SubmitForm from '../components/submitForm';

export default function Page() {

	return (
		<main>
			<div className="hero">
				<h2>Travel Planning</h2>
				<p>
					Enter the country you want to visit and we will suggest the best route
				</p>
				<SubmitForm />
			</div>
		</main>
	);
};
