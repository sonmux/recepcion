// middleware.js
import jwt from 'jsonwebtoken';
const secretKey = 'secretkey'; // Reemplaza con tu clave secreta real

export const authenticateToken = async (req, res, next) =>{
    const token = req.headers.authorization;

    if (!token) {
      return res.sendStatus(401); // El token no se proporcionó, se deniega el acceso
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Token inválido, se deniega el acceso
      }
      req.user = user; // Almacenar los datos del usuario decodificados en el objeto de solicitud
      next();
    });
}
