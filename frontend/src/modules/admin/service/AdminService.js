import { httpHelper } from "../../../utils/httpHelper"
import { ADMIN_ENDPOINTS } from "../../../config/apiConfig"

const AdminService = {

    fetchAllPlayers: async () => {

        const response = await httpHelper.get(ADMIN_ENDPOINTS.PLAYERS);
        if (response.status !== 200) {
            throw new Error(response.data.message || "Failed to load players");
        }
        return response.data.data;
    },

    updatePlayerStatus: async (userId, status) => {

        const response = await httpHelper.patch(
            ADMIN_ENDPOINTS.UPDATE_STATUS(userId), 
            { isActive: status }
        );

        if (response.status !== 200) {
            throw new Error(response.data.message || "Update failed");
        }
        return response.data.data;
    }
};

export default AdminService