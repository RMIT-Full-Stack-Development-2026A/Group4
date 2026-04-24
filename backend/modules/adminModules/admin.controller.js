import { AdminService } from "./admin.service.js";

const AdminController = {
    // Getting all players
    getAllPlayers: async (req, res, next) => {
        try {
            // get the list from service
            const players = await AdminService.getAllPlayersList();

            // send the players list back to frontend
            return res.status(200).json({
                success: true,
                message: "Player list retrieved successfully",
                count: players.length,
                data: players
            });
        } catch (err) {
            next(err); 
        }
    },
    // Activating/deactivating account
    toggleAccountStatus: async (req, res, next) => {
        try {
            // extract the ID and the new status
            const targetId = req.params.id;
            const { isActive } = req.body;

            // call the service
            const updatedAccount = await AdminService.changeActiveStatus(targetId, isActive);

            // return success message
            return res.status(200).json({
                success: true,
                message: `Account status updated to ${isActive ? 'Active' : 'Deactivated'}`,
                data: updatedAccount
            });
        } catch (err) {
            next(err);
        }
    }
};

export default AdminController