// Importing dependencies:
import {Router} from 'express';

// Import controller and middleware:
import  AdminController from '../adminModules/admin.controller.js';
import { isAdmin, validateToggleInput } from './admin.middleware.js';

// Creating a router:
const AdminRouter = Router();
  
AdminRouter.use(isAdmin)
// get all players
AdminRouter.get('/players', AdminController.getAllPlayers)
// activate/deactivate player
AdminRouter.post('/players/:id', validateToggleInput, AdminController.toggleAccountStatus)

export default AdminRouter;