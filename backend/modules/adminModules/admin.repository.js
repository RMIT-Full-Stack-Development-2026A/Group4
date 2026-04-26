// import data models
import Account from "../accountModules/account.model.js";
import Profile from "../profileModules/profile.model.js";

// Defining repository class:
export const AdminRepository = {
    // get player info
     async fetchAllPlayers() {
        // Get the account info
        const accounts = await Account.find({ userRole: 'PLAYER' })
                                      .select('email username isActive')
                                      .lean();

        // Get the profile info
        const playerIds = accounts.map(acc => acc._id);
        const profiles = await Profile.find({ user_id: { $in: playerIds }})
                                      .select('user_id isPremium') 
                                      .lean();

        // Merge and return account and profile info to the Service
        return accounts.map(acc => {
            const prof = profiles.find(p => p.user_id.toString() === acc._id.toString());
            return { acc, prof };
        });
    },

    // update player account status
    async updateActiveStatus(userId, newStatus) {
        return await Account.findByIdAndUpdate(
            userId, 
            { isActive: newStatus }, 
            { new: true }
        );
    },

    // for error handling
    async findAccountById(userId) {
        return await Account.findById(userId)
                            .select('userRole isActive') 
                            .lean();
    },
}