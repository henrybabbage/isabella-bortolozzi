const useStorage = () => {
    function storageType(type) {
        return `${type || 'session'}Storage`
    }

    const isBrowser = typeof window !== 'undefined'

    const getItem = (key, type) => (isBrowser ? window[storageType(type)][key] : '')

    const setItem = (key, value, type) => {
        if (isBrowser) {
            window[storageType(type)].setItem(key, value)
            return true
        }

        return false
    }

    const removeItem = (key, type) => {
        window[storageType(type)].removeItem(key)
    }

    return {
        getItem,
        setItem,
        removeItem
    }
}

export default useStorage
