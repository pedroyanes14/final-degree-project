import PostAIPage from "../../../components/postAIPage";

export default function Page ({ searchParams }) {

	return (
		<PostAIPage searchParams={searchParams.country}/>
	);
};
