
export async function urlToObject (url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', {type: blob.type});
    return file
  }
  catch (err) {
    throw('Error while selecting icon.')
  }
}
