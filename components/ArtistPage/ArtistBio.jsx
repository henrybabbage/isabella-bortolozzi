
export default function ArtistBio({ artistBio1, artistBio2 }) {
	return (
		<section className='mb-6'>
			{artistBio1 && (
				<div>
					{artistBio1?.yearOfBirth ? <p className="text-primary">Born {artistBio1?.yearOfBirth}</p> : null}
					{artistBio1?.locationOfBirth ? <p className="text-primary">in {artistBio1?.locationOfBirth}</p> : null}
					{artistBio1?.livesAndWorks ? <p className="text-primary">Lives and works in {artistBio1?.livesAndWorks}</p> : null}
				</div>
			)}
			{artistBio2 && (
				<div>
					{artistBio2?.yearOfBirth ? <p className="text-primary">Born {artistBio2?.yearOfBirth}</p> : null}
					{artistBio2?.locationOfBirth ? <p className="text-primary">in {artistBio2?.locationOfBirth}</p> : null}
					{artistBio2?.livesAndWorks ? <p className="text-primary">Lives and works in {artistBio2?.livesAndWorks}</p> : null}
				</div>
			)}
		</section>
	)
}
