
$.get('videos', (videos) => {
  const gallery = $('#video-gallery')

  videos.map(video => {
    gallery.append(`<a href=/player/${video.id}>${video.description}</a>`)
  })
})
