const userService = require('../services/UserService');

class UserController {

    async createUser(req, res, next) {
        try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(req, res, next) {
        try {
        const users = await userService.getAllUsers();
        res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req, res, next) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async getUserByEmail(req, res, next) {
    try {
        const user = await userService.getUserByEmail(req.query.email);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        next(error);
    }
    }

    async updateUser(req, res, next) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const user = await userService.deleteUser(req.params.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
    
}

module.exports = new UserController();