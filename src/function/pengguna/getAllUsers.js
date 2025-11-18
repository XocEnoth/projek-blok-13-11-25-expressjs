import { pengguna } from "../../../data/pengguna.js";

export default async function getAllUsers(req, res) {
    try {
        let hasAccess = false;
        pengguna.forEach((user) => {
            if (
                user.username === req.body.username &&
                user.password === req.body.password &&
                user.role === "admin"
            ) {
                hasAccess = true;
            }
        });

        if (hasAccess) {
            return res.status(200).send(pengguna);
        } else {
            return res.status(400).send({
                status: "invalid",
                msg: "maaf, kami tidak bisa menyelesaikan proses yang anda minta!",
            });
        }
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
