// Importing dependencies:
import {Router} from 'express';

// Import controller and middleware:
import  AdminController from '../adminModules/admin.controller.js';
import { isAdmin, validateToggleInput } from './admin.middleware.js';
import { authMiddleware } from '../shared/shared.middleware.js';
// Creating a router:

const AdminRouter = Router();

// check if the user is logged in and is admin
AdminRouter.use(authMiddleware)
AdminRouter.use(isAdmin)
// get all players
AdminRouter.get('/players', AdminController.getAllPlayers)
// activate/deactivate player
AdminRouter.patch('/players/:id', validateToggleInput, AdminController.toggleAccountStatus)

export default AdminRouter;