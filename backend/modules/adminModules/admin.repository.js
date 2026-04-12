// import data models
import Account from "../authenticationModules/account.model";
import Profile from "../userModules/profile.model";

export const AdminRepository = {
    // get player info
    async fetchAllPlayers() {
        // get player accounts info
        const accounts = await Account.find({ userRole: 'PLAYER' })
                                      .select('email username isActive')
                                      .lean();

        // get matching player profiles                              
        const playerIds = accounts.map(acc => acc._id);
        const profiles = await Profile.find({ user_id: { $in: playerIds }})
                                      .select('user_id isPremium') 
                                      .lean()

        // merge accounts and profiles                                      
        return accounts.map(acc => {
            const prof = profiles.find(p => p.user_id.toString() === acc._id.toString());
            return {
                ...acc,
                premium: prof?.isPremium || false
            };
        });
    },

    // activate/deactivate player account
    async updateAccountStatus(userId, newStatus) {
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