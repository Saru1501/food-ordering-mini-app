import { Platform } from "react-native";
import {Account, Avatars, Databases, ID, Query, Storage} from "react-native-appwrite";
import { Client } from "react-native-appwrite";
import SignIn from "@/app/(auth)/sign-in";
import {CreateUserParams, GetMenuParams, SignInParams} from "@/type";
import * as Sentry from "@sentry/react-native";


export const appwriteConfig = {
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,//EXPO_PUBLIC_APPWRITE_ENDPOINT
    Platform:"com.USRA.foodordering",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId:'69655b270021c3368072',
    bucketId:'69677fad000fffdac371',
    userCollectionId:'69655c35003bc39ff575',
    categoriesCollectionId:'categories',// Replace with your actual Categories Collection ID
    menuCollectionId:'menu', // Replace with your actual Menu Collection ID
    customizationsCollectionId:'customization',
    menuCustomizationsCollectionId:'69677c9c002dcb601d4c',


}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.Platform)

export const account = new Account(client);
export const databases = new Databases(client);    
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)
        if(!newAccount) throw Error;

        await SignIn({ email, password});

         const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, accountId: newAccount.$id, avatar: avatarUrl }
        );
    } catch (e) {
        throw new Error(e as string);
    }
}

// ...existing code...

export const signIn = async ({ email, password }: SignInParams): Promise<any> => {
    try {
        const session = await account.createSession(email, password); // Or account.createSession if createEmailSession is unavailable
        return session; // Return the session for use in calling code
    } catch (e) {
         throw new Error(e as string); // Preserve original error details instead of casting to string
    }
}

// ...existing code...

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (e) {
        console.log(e);
        throw new Error(e as string);
    }
}

export const getMenu = async ({ category, query }: GetMenuParams) => {
    try {
        const queries: string[] = [];

        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId, // Menu Collection ID
            queries,
        )

        return menus.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,// Categories Collection ID
        )

        return categories.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}