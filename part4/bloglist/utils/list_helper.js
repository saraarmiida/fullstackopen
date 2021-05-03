const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	likes = blogs
		.map(blog => blog.likes)
		.reduce((a, b) => a + b, 0)
	
	return likes
}

const favoriteBlog = (blogs) => {
	let i = 0
	let maxLikes = 0
	let favoriteBlog = 0

	if (blogs.length === 0 || blogs === undefined) {
		return 0
	}

	while (i < blogs.length) {
		if (blogs[i].likes > maxLikes) {
			favoriteBlog = i
			maxLikes = blogs[i].likes
		}
		i++
	}

	return blogs[favoriteBlog]
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}