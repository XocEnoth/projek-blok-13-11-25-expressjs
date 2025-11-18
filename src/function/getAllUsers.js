import { user } from "../../data/user.js";

export default function getAllUsers(req, res) {
    try {
        return res.status(200).send(user);
    } catch (error) {
        console.error("!! ERROR : ./src/function/getAllUsers.js !!\n\n", error);
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
