import Link from 'next/link'

export default function DynamicLink({ link, children, scroll = false, prefetch = undefined, replace = false, shallow = false, attributes = {}, ...rest }) {
	if (!link) return null

	const getDynamicRoute = (route) => {
		switch (route) {
			case 'exhibition':
				return '/exhibitions'
			case 'artist':
				return '/'
			case 'viewingRoom':
				return '/viewing-rooms'
		}
	}

	function getSlug(link) {
		if (!link) return
		if (link._type === 'exhibition' || link._type === 'viewingRoom') {
			return `${link.slug}` ?? ''
		} else if (link._type === 'artist' || link._type === 'news') {
			return `${link.page.slug}` ?? ''
		}
		return ''
	}

	function getType(link) {
		if (!link) return
		if (link._type === 'exhibition' || link?._type === 'viewingRoom') {
			return link._type ?? ''
		} else if (link._type === 'artist' || link._type === 'news') {
			return link.page._type ?? ''
		}
		return ''
	}

	// Ensure external links open in a new tab
	if (link._externalDisplay === true) {
		attributes.target = '_blank'
		attributes.rel = 'noopener noreferrer'
	}

	// if news item has no link then we do not need a link element
	if (link._type === 'news' && !link.externalLink && !link.page) {
		return <div {...rest}>{children}</div>
		// External link
	} else if (link.externalLink) {
		return (
			<a
				href={link.externalLink.url ?? ''}
				target="_blank"
				rel="noopener noreferrer"
				className="cursor-pointer"
				{...attributes}
				{...rest}
			>
				{children}
			</a>
		)
		// Internal Page
	} else {
		const slug = getSlug(link)
		const type = getType(link)
		const page = getDynamicRoute(type)
		return (
			<Link
				href={{
					pathname: `${page}/[slug]`,
					query: {
						slug: slug,
					},
				}}
                legacyBehavior
                prefetch={prefetch}
                scroll={scroll}
                shallow={shallow}
                replace={replace}
				className="cursor-pointer"
				{...rest}
			>
				{children}
			</Link>
		)
	}
}
