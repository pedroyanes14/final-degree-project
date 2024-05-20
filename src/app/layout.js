import Navbar from './navbar';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
	title: 'Final Degree Project',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				<div className="container">{children}<SpeedInsights /></div>
			</body>
		</html>
	);
}
