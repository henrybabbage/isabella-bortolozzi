
export default function ArtistBio({ artistBio1, artistBio2 }) {
	return (
		<>
			{artistBio1 && (
				<div>
					{artistBio1?.yearOfBirth ? <p className="body">Born {artistBio1?.yearOfBirth}</p> : null}
					{artistBio1?.locationOfBirth ? <p className="body">in {artistBio1?.locationOfBirth}</p> : null}
					{artistBio1?.livesAndWorks ? <p className="body">Lives and works in {artistBio1?.livesAndWorks}</p> : null}
				</div>
			)}
			{artistBio2 && (
				<div>
					{artistBio2?.yearOfBirth ? <p className="body">Born {artistBio2?.yearOfBirth}</p> : null}
					{artistBio2?.locationOfBirth ? <p className="body">in {artistBio2?.locationOfBirth}</p> : null}
					{artistBio2?.livesAndWorks ? <p className="body">Lives and works in {artistBio2?.livesAndWorks}</p> : null}
				</div>
			)}
		</>
	)
}
