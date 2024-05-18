"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mogoose";

export async function updateUser(
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string,
): Promise<void> {

    connectToDB();

    try {
        await User.findOneAndUpdate(
            {id: userId},
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            { upsert: true }
        );
    
        if(path === "/profile/edit") {
            revalidatePath(path);
        }
    } catch (error: any) {
        console.log(`Error updating/inserting user: ${error.message}`);
    }
}