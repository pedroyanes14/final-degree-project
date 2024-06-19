"use client";

import Link from 'next/link';

const NavLinks = [
	{ id: 1, name: 'Home', path: '/' },
];

export default function Navbar() {
	return (
		<nav>
			<div className="navbar">
				<Link href="/">
					<span className="logo">PlanYourTravel</span>				
				</Link>
				<img src='/icon.png'/>
				<ul>
					{NavLinks.map((link) => {
						return (
							<li key={link.id}>
								<Link
									href={link.path}
									className="active"
								>
									{link.name}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
};
