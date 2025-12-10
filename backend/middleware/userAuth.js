import jwt from 'jsonwebtoken'

// Middleware: verify JWT token from cookies and attach `req.user`
const userAuth = (req, res, next) => {
    // Guard: cookie-parser must be used in app (app.use(cookieParser()))
    console.log('req.headers.cookie', req.headers.cookie)
    const token = req.cookies?.token
    console.log('cookie token:', token)

    if (!token) {
        console.log('no token found in cookies')
        return res.status(401).json({ success: false, message: 'not authorized login again' })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if (tokenDecode && tokenDecode.id) {
            req.user = { id: tokenDecode.id }
            console.log('authenticated user id:', req.user.id)
            return next()
        }

        return res.status(401).json({ success: false, message: 'not authorized login again' })
    } catch (error) {
        console.error('JWT verify error:', error)
        return res.status(401).json({ success: false, message: 'not authorized login again' })
    }
}

export default userAuth

// next shows after finishing the userAuth fxn it execute the controllers