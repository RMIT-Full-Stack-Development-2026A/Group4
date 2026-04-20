// Importing repository queries
import {  findUserBasedOnId } from './user.repository'
// Basic queries: 
export const findExistingUser = async ( userId ) => {
    try {
        const user = await findUserBasedOnId(userId);
        if (!user) {
            throw new UserNotFoundError();
        };
        // Converting user object to fit with user DTO:
        const userDTO = new userDto(user);
        return userDTO;
    }
    catch (err) {
        throw err
    }
};
export const updateUserInfo = () => {

};
export const getUserInfo = ( ) => {

};
export const deactivateUser = () => {

};
export const reActivateUser = () => {

}