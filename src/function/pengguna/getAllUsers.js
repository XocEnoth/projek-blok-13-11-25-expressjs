import { pengguna } from "../../../data/pengguna.js";
import checkSession from "./checkSession.js";

export default async function getAllUsers(req, res) {
    try {
        let hasAccess = await checkSession(["admin"]);

        if (hasAccess !== true) {
            return res.status(400).send({
                status: "invalid",
                msg: "maaf, kami tidak bisa menyelesaikan proses yang anda minta!",
            });
        }

        return res.status(200).send(pengguna);
    } catch (error) {
        console.error(
            "!! ERROR : ./src/function/pengguna/getAllUsers.js !!\n\n",
            error
        );
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
