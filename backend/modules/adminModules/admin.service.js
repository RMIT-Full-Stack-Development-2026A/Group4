import { AdminRepository } from "./admin.repository";
import { 
    adminProtectionError, 
    playerNotFoundError, 
    accountStatusRedundantError
} from './admin.error';

export const AdminService = {

    getAllPlayersList: async () => {
        const players = await AdminRepository.fetchAllPlayers();
        return players;
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