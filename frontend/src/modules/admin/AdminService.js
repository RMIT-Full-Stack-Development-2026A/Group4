import HttpHelper from "../../utils/HttpHelper"
import { ADMIN_ENDPOINTS } from "../../config/apiConfig"

const AdminService = {

    fetchAllPlayers: async () => {
        try {

            const response = await httpHelper.get(ADMIN_ENDPOINTS.PLAYERS);

            if (response.status === 200) {
                return response.data.players; 
            } else {
                throw new Error(response.data.message || "Failed to load players");
            }
        } catch (error) {
            console.error("AdminService Fetch Error:", error);
            throw error; // Let the Hook/Page handle the error message
        }
    },

    updatePlayerStatus: async (userId, status) => {
        try {

            const response = await httpHelper.patch(
                ADMIN_ENDPOINTS.UPDATE_STATUS(userId), 
                { isActive: status } // Send the "Flipped" status
            );

            if (response.status === 200) {
                return response.data.updatedPlayer;
            } else {
                throw new Error(response.data.message || "Update failed");
            }
        } catch (error) {
            console.error("AdminService Update Error:", error);
            throw error;
        }
    }
};

export default AdminService