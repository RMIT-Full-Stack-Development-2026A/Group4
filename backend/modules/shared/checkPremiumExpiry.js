export default async function checkPremiumExpiry(profile) {
    if (!profile) return null;

    if (profile.isPremium && profile.premiumExpiryDate && new Date() > profile.premiumExpiryDate) {
        profile.isPremium = false;
        await profile.save();
    }
};