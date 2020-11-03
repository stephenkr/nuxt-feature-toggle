module.exports = async function (toggles) {
  if (typeof toggles === 'function') {
    try {
      return toggles()
    } catch (e) {
      throw new Error(e)
    }
  } else if (typeof toggles === 'object') {
    return toggles
  }
}
