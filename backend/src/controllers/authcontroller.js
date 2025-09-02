const userService = require('../services/UserService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; 
const JWT_EXPIRES_IN = '1h';

class AuthController {
  
  // User registration
  async register(req, res, next) {
    try {
      const userData = req.body;
      const user = await userService.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  // User login
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new AuthController();
