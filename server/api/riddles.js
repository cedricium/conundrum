const atob = require('atob');
const admin = require('firebase-admin')
const { Router } = require('express')
const router = Router()

const NODE_ENV = process.env.NODE_ENV || 'development'
const PRIVATE_KEY = NODE_ENV === 'production'
  ? atob(process.env.PRIVATE_KEY)
  : process.env.PRIVATE_KEY

admin.initializeApp({
  credential: admin.credential.cert({
    "type": process.env.TYPE,
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
  }),
})
const db = admin.firestore()
const riddlesRef = db.collection('riddles')

router.get('/', async (req, res) => {
  try {
    const riddlesSnapshot = await riddlesRef.get()
    const riddles = []
    riddlesSnapshot.forEach((doc) => {
      const r = doc.data()
      r['id'] = doc.id
      riddles.push(r)
    })
    res.json(riddles)
  } catch (e) {
    res.status(400).json({
      error: e.message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const riddle = await riddlesRef.doc(id).get()

    if (!riddle.exists) {
      throw new Error(`No such document with 'id': ${id}`)
    } else {
      const r = riddle.data()
      r['id'] = id
      res.json(r)
    }
  } catch (e) {
    res.status(400).json({
      error: e.message
    })
  }
})

module.exports = router
