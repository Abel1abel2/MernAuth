
import jwt from 'jsonwebtoken';

const oAuth = async (req, res, next) => {
  
    const authHeader = req.headers.authorization; 

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({ success: false, message: 'Not authorized, missing or invalid Bearer token' });
    }

    const token = authHeader.split(' ')[1]; 

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.user = { id: tokenDecode.id };
            console.log(req.user.id);
            next();
        } else {
            return res.json({ success: false, message: 'Not authorized, invalid token' });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
export default oAuth