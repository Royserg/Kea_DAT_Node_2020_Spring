const router = require('express').Router()

const crypto = require('crypto')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'videos/')
  },
  filename: (req, file, cb) => {
    const mimetypeArray = file.mimetype.split('/')

    if (mimetypeArray[0] === 'video') {
      const extension = mimetypeArray[mimetypeArray.length - 1]
      const fileName = crypto.randomBytes(18).toString('hex')

      cb(null, `${fileName}.${extension}`)
    } else {
      cb('Error: The file is not a video')
    }
  }
})

const upload = multer({ storage })

const videos = [
  {
    id: '1',
    title: 'NightSky',
    thumbnail: '',
    description: 'Watch this nice video of sky',
    fileName: '1663d9ec-0dfd-4431-a469-6bc4b888ec2d.mp4',
    uploadDate: '',
    category: 'Science',
    tags: ['starts', 'sky'],
  },
  {
    id: '2',
    title: 'Yellow Carpet',
    thumbnail: '',
    description: 'The Carpet',
    fileName: '1663d9ec-0dfd-4431-a469-6bc4b888ec2d.mp4',
    uploadDate: '',
    category: 'Science',
    tags: ['starts', 'sky'],
  },
]

const videosPerPage = 12

router.get('/videos', (req, res) => {
  const page = Number(req.query.page) ? Number(req.query.page) : 1
  const start = (page - 1) * videosPerPage
  const end = start + videosPerPage

  res.json(videos.slice(start, end))
})

router.get('/videos/:id', (req, res) => {
  const { id } = req.params

  const video = videos.find(vid => vid.id === id)
  res.json(video)
})

router.post('/videos', upload.single('video'), (req, res) => {
  const { filename, size } = req.file
  const { title, category, description, tags } = req.body

  // Validation
  const fileSizeLimit = 262144000
  if (size > fileSizeLimit) {
    return res.status(400).send({ msg: `Video is too big, limit ${fileSizeLimit}bytes` })
  }

  const titleMaxLength = 128
  if (title.trim().length === 0 || title.length > titleMaxLength) {
    return res.status(400).send({ msg: `Missing title or title longer than ${titleMaxLength}` })
  }

  const descriptionMaxLength = 2048
  if (description.length > descriptionMaxLength) {
    return res.status(400).send({ msg: `Description cannot be longer than ${descriptionMaxLength}` })
  }

  const video = {
    id: (videos.length + 1).toString(),
    title: title,
    description: description,
    thumbnail: '',
    fileName: filename,
    uploadDate: new Date(),
    category: category,
    tags: tags.split(/\s*[,\s]\s*/),
  }

  // Add video to the array
  videos.push(video)

  res.redirect('/')
})

module.exports = router