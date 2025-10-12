export default function getCategoryViewData (movieCategory) {
    const categories = [
        {value: "tv-show", label: "TV Show"},
        {value: 'animation', label: "Animation"},
        {value: 'movie', label: "Movie"},
        {value: 'documentary', label: "Documentary"},
        {value: 'short-film', label: "Short Film"}
    ]

    const viewData = categories.map(category => ({...category, selected: movieCategory === category.value ? 'selected' : ""}))
    return viewData;
}