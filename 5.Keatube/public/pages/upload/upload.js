let fileValid = false

const validateForm = () => {
  const title = document.forms.videoUpload.title.value.trim()
  const category = document.forms.videoUpload.category.value
  const description = document.forms.videoUpload.description.value
  const tags = document.forms.videoUpload.tags.value

  const titleMaxLength = 128
  // Title can't be empty and no longer than 128 chars
  if (title.length === 0 || title.length > titleMaxLength) {
    return false
  }

  const descriptionMaxLength = 2048
  if (description.length > descriptionMaxLength) {
    return false
  }

  return fileValid
}

const handleFileUpload = (e) => {
  const file = $('#fileInput').prop('files')[0]
  const fileSize = file.size
  const mimeArray = file.type.split('/')
  const fileType = mimeArray[0]

  console.log(file, fileSize, mimeArray, fileType)
  if (fileType !== 'video') {
    fileType = false
    return
  }

  // 262144000 -> 250 mb
  const fileSizeLimit = 262144000

  if (fileSize > fileSizeLimit) {
    fileValid = false
    return
  }

  fileValid = true
}

$('#uploadForm').submit(validateForm)
$('#fileInput').on('change', handleFileUpload)