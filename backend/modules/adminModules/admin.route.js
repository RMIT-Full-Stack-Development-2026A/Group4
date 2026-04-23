import {Router} from 'express';

// import controller and middleware
import { AdminController } from './admin.controller';
import { isAdmin, validateToggleInput } from './admin.middleware';

const AdminRouter = Router();
  
// get all players
AdminRouter.get('/players', isAdmin, AdminController.getAllPlayers)
// activate/deactivate player
AdminRouter.post('/players/:id', isAdmin, validateToggleInput, AdminController.toggleAccountStatus)
export default AdminRouter;