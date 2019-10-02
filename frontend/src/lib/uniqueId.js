const uniqueId = () => {
  return (
    'i' +
    // new Date().getTime() +
    Date.now() +
    // '' +
    Math.random()
      .toString()
      .slice(2, 12)
  )
  // return btoa(Math.random()).slice(0, 20)

  // return Math.random()
  //   .toString(36)
  //   .slice(-15)
}
export default uniqueId
