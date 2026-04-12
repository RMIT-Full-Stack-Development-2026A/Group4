import { AdminRepository } from "./admin.repository";
import { 
    adminProtectionError, 
    playerNotFoundError, 
    accountStatusRedundantError
} from './admin.error';

export const getAllPlayersList = async () => {
    try {
        const players = await AdminRepository.fetchAllPlayers();
        return players;
    }
    catch (err) {
        console.error(`[Admin Service Error]: ${err.message}`);
        throw err;
    }
};

export const togglePlayerStatus = async (targetPlayerId, newStatus) => {
    try {

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
        return await AdminRepository.updateAccountStatus(targetPlayerId, newStatus);
    }
    catch (err) {
        throw err; 
    }
};