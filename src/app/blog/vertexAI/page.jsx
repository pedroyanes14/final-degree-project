import PostAIPage from "../../../components/postAIPage";

export default async function Page ({ searchParams }) {

	return (
		<PostAIPage searchParams={searchParams.country}/>
	);
};
