import { aboveTheFoldImageBySlugQuery, artistBySlugQuery, artistsQuery, exhibitionBySlugQuery, exhibitionImagesBySlugQuery, exhibitionsQuery, galleryQuery, homeQuery, imprintQuery, newsQuery, viewingRoomBySlugQuery, viewingRoomsQuery } from './sanity.queries'

export async function getImprint(client) {
	return await client.fetch(imprintQuery)
}

export async function getHome(client) {
	return await client.fetch(homeQuery)
}

export async function getNews(client) {
	return await client.fetch(newsQuery)
}


export async function getGallery(client) {
	return await client.fetch(galleryQuery)
}

export async function getArtist(client, slug) {
	return await client.fetch(artistBySlugQuery, {
		slug,
	})
}

export async function getArtists(client) {
	return await client.fetch(artistsQuery)
}

export async function getExhibition(client, slug) {
	return await client.fetch(exhibitionBySlugQuery, {
		slug,
	})
}

export async function getExhibitionImages(client, slug) {
	return await client.fetch(exhibitionImagesBySlugQuery, {
		slug,
	})
}

export async function getAboveTheFoldImage(client, slug, _type) {
	return await client.fetch(aboveTheFoldImageBySlugQuery, {
		slug,
        _type,
	})
}

export async function getExhibitions(client) {
	return await client.fetch(exhibitionsQuery)
}

export async function getViewingRoom(client, slug) {
	return await client.fetch(viewingRoomBySlugQuery, {
		slug,
	})
}

export async function getViewingRooms(client) {
	return await client.fetch(viewingRoomsQuery)
}

