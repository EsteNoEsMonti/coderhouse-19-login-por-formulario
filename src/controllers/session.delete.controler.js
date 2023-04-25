export async function deleteSessionController(req, res, next) {
  req.session.destroy(err => {
    res.sendStatus(200)
  })
}