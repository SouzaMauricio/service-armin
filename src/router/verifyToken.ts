import { TokenManagerService } from '../application/services/TokenManager'

const validateToken = async (req: any, res: any, next: any): Promise<void> => {
  try {
    const token = req.headers['x-access-token']
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' })
    const tokenManagerService = new TokenManagerService()
    const isTokenValid = await tokenManagerService.verifyToken(token)
    if (!isTokenValid) res.status(401).json({ auth: false, message: 'Failed to authenticate token.' })
    req.body.user = isTokenValid.body.id
    next()
  } catch (error) {
    console.error('Error: ', error)
    res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
  }
}

const checkTokenProvider = async (req: any, res: any, next: any): Promise<void> => {
  try {
    const token = req.headers['x-access-token']
    if (!token || token === 'null') {
      next()
      return
    }
    const tokenManagerService = new TokenManagerService()
    const isTokenValid = await tokenManagerService.verifyToken(token)
    if (!isTokenValid) res.status(401).json({ auth: false, message: 'Failed to authenticate token.' })
    req.body.user = isTokenValid.body.id
    next()
  } catch (error) {
    console.error('Error: ', error)
    res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
  }
}

export {
  validateToken,
  checkTokenProvider
}
