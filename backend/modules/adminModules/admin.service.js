import checkPremiumExpiry from "../shared/checkPremiumExpiry.js";
import { AdminRepository } from "./admin.repository.js";
import { AdminDTO } from "./admin.dto.js";
import { 
    adminProtectionError, 
    playerNotFoundError, 
    accountStatusRedundantError
} from './admin.error.js';

export const AdminService = {

    getAllPlayersList: async () => {
        const rawData = await AdminRepository.fetchAllPlayers();
        // turn raw data to dto (check premium expiry as well)
        const dtoList = await Promise.all(rawData.map(async (data) => {
            if (data.prof) await checkPremiumExpiry(data.prof);
            return new AdminDTO(data.acc, data.prof);
        }));
        return dtoList;
    },

    changeActiveStatus: async (targetPlayerId, newStatus) => {
        // verify player existence
        const account = await AdminRepository.findAccountById(targetPlayerId); 
        
        if (!account) {
            throw new playerNotFoundError();
        }

        // prevent modifying any Admin account
        if (account.userRole === 'ADMIN') {
            throw new adminProtectionError();
        }

        // prevent redundant operations
        if (account.isActive === newStatus) {
            throw new accountStatusRedundantError();
        }

        // update
        return await AdminRepository.updateActiveStatus(targetPlayerId, newStatus);
    }
};