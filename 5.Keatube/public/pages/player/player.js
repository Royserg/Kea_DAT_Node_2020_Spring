const url = window.location.href
const videoId = url.substring(url.lastIndexOf('/') + 1)


$.get(`/videos/${videoId}`)
  .done(video => {
    // Set title
    $('.title').text(video.title)
    // Attach video player
    const videoPlayer = $(`<video controls>
                        <source src="/${video.fileName}" />
                        Your browser does not support the video tag.
                      </video>`)

    $('#player').append(videoPlayer)
    // Set description
    $('.description').text(video.description)
  })
  .catch(error => {
    console.log(error)
    $('.title').text('Failed to load the video')
  })


