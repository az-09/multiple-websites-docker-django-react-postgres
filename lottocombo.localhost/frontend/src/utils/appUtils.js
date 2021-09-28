export const cleanedSearchNumbers = (search) => {
    const regex = /[.,\s]/g;
    let cleanedSearch = search.trim().replace(regex, ',')
    cleanedSearch = cleanedSearch.split(',').sort() // 30, 20 -> 20, 30
    cleanedSearch = cleanedSearch.map(item => item.padStart(2, '0')).join(', ') // leading 0 and add comma 44, 2 -> 02, 44
    return cleanedSearch

}

export const localDateTime = (date) => new Date(date).toLocaleDateString();