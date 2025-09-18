import { Request, Response } from "express";
import  User  from "../../users/models/user.models";
export const LogIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email, password } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }   
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
