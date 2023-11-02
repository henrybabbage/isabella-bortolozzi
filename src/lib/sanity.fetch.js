import { exhibitionBySlugQuery, exhibitionsQuery, postBySlugQuery, postsQuery, viewingRoomBySlugQuery, viewingRoomsQuery } from './sanity.queries'

export async function getPost(client, slug) {
	return await client.fetch(postBySlugQuery, {
		slug,
	})
}

export async function getPosts(client) {
	return await client.fetch(postsQuery)
}

export async function getExhibition(client, slug) {
	return await client.fetch(exhibitionBySlugQuery, {
		slug,
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

