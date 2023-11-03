import { format, parseISO } from 'date-fns'

export function getYear(dateString) {
	if (!dateString) {
		return null
	}
	const dateOnly = dateString.split('T')[0]
	return format(new Date(dateOnly), 'yyyy')
}

export function formatOpeningDateTime(dateString) {
	if (!dateString) {
		return ''
	}
	const date = parseISO(dateString)
	return format(date, 'dd MMMM yyyy, h aaa')
}

export function formatDatesWithYear({ startDate, endDate }) {
	if (!startDate || !endDate) {
		return ''
	}
	return (
		<span>
			{format(new Date(startDate), 'dd MMM')}—{format(new Date(endDate), 'dd MMM yyyy')}
		</span>
	)
}

export function formatDatesWithoutYears({ startDate, endDate }) {
	if (!startDate || !endDate) {
		return ''
	}
	return (
		<span>
			{format(new Date(startDate), 'dd MMM')}—{format(new Date(endDate), 'dd MMM')}
		</span>
	)
}

export function formatDateWithoutYear(dateString) {
	if (!dateString) {
		return ''
	}
	const date = parseISO(dateString)
	return format(date, 'dd MMM')
}

export function isFutureDate (checkDate) {
	if (!checkDate) return true
	return new Date().getTime() < new Date(checkDate).getTime()
}
