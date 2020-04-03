const express = require('express')
const app = express()
const fs = require('fs')

// Json parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))
app.use(express.static('videos'))

const pagesDirectory = `${__dirname}/public/pages/`

const navbar = fs.readFileSync(pagesDirectory + 'navbar/navbar.html', { encoding: 'utf8' })
const footer = fs.readFileSync(pagesDirectory + 'footer/footer.html', { encoding: 'utf8' })
const index = fs.readFileSync(pagesDirectory + 'frontpage/frontpage.html', { encoding: 'utf8' })
const player = fs.readFileSync(pagesDirectory + 'player/player.html', { encoding: 'utf8' })
const upload = fs.readFileSync(pagesDirectory + 'upload/upload.html', { encoding: 'utf8' })

app.get('/', (req, res) => {
  res.send(navbar + index + footer)
})

app.get('/player/:id', (req, res) => {
  res.send(navbar + player + footer)
})

app.get('/upload', (req, res) => {
  res.send(navbar + upload + footer)
})

// Import routes
const videosRoute = require('./routes/videos')
// Use routes
app.use(videosRoute)


const PORT = process.env.PORT || 8080
app.listen(PORT, error => {
  if (error) {
    console.log(error)
  }
  console.log(`Server running on port ${PORT}`)
})
