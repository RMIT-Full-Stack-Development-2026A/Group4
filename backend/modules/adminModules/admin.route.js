// Importing dependencies:
import {Router} from 'express';

// Import controller and middleware:
import  AdminController from '../adminModules/admin.controller.js';
import { isAdmin, validateToggleInput } from './admin.middleware.js';

// Creating a router:
const AdminRouter = Router();
  
// DEFINING ROUTES:
// Getting all players
AdminRouter.get('/players', isAdmin, AdminController.getAllPlayers)
// Activating/Deactivating a player
AdminRouter.post('/players/:id', isAdmin, validateToggleInput, AdminController.toggleAccountStatus)

// Exporting router:
export default AdminRouter;