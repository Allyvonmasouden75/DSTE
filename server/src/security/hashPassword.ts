import argon2 from "argon2";

export const hashPassword = async (password: string): Promise <string> => {
    try {
        const hash = await argon2.hash(password, {
            type: argon2.argon2id, // best for general-purpose use
            memoryCost: 2 ** 16, // 64MB RAM to it uses that (higher == more secure)
            timeCost: 12, // number of iterations
            parallelism: 2 // parallel processing
        });

        return hash;
        
    } catch (error) {
        return "Failed to hash the password"
    }
}