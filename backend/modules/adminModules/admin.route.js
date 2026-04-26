import {Router} from 'express';

// import controller and middleware
import { AdminController } from './admin.controller';
import { isAdmin, validateToggleInput } from './admin.middleware';

const AdminRouter = Router();
  
AdminRouter.use(isAdmin)
// get all players
AdminRouter.get('/players', AdminController.getAllPlayers)
// activate/deactivate player
AdminRouter.post('/players/:id', validateToggleInput, AdminController.toggleAccountStatus)

export default AdminRouter;