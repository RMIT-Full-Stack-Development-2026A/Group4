// Importing repository queries: 
import { createAccount, findByEmail } from "./account.repository.js"
import {createProfile} from "../profileModules/profile.repository.js"
// Importing DTO:
import accountDTO from './account.dto.js'
// Importing error:
import { userAlreadyExistsError } from "./account.error.js";

export const creatingNewAccount = async (userInput) => {
    // Check if user already exists: 
    const user = await findByEmail(userInput.email);
    // If user already exists
    if (user){
        throw new userAlreadyExistsError();
    };
    // Creating DTO from user input: 
    const newUser = await createAccount(userInput);

    await createProfile({
        user_id: newUser._id,
        country: userInput.country || 'Unknown',
    });
    
    // Create a dto to create new user:
    const account= new accountDTO(newUser);
    return account;
}

export const deactivateExistingAccount = async () => {

}

export const deleteExistingUser = async () => {

}