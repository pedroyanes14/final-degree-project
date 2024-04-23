import Link from 'next/link';

const page = () => {
	return (
		<div className="hero">
			<h2>Travel Planning</h2>
			<p>
				Enter the country you want to visit and we will suggest the best route
			</p>
			<div className="submit">
				<input placeholder="Enter your country..." className="input"/>
				<Link href="/blog" className="btn">
					Find out your next trip
				</Link>
			</div>
		</div>
	);
};

export default page;