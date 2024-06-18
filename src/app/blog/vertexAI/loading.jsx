import ContentLoader from 'react-content-loader'

export default function Loading() {
    return (
        <ContentLoader viewBox="0 0 2000 720" height={720} width={2000}>
        <rect x="0" y="13" rx="4" ry="4" width="1200" height="9" />
        <rect x="0" y="29" rx="4" ry="4" width="400" height="8" />
        <rect x="0" y="50" rx="4" ry="4" width="1200" height="10" />
        <rect x="0" y="65" rx="4" ry="4" width="1200" height="10" />
        <rect x="0" y="79" rx="4" ry="4" width="400" height="10" />
        <rect x="0" y="99" rx="5" ry="5" width="1200" height="200" />
        </ContentLoader>
    );
}