import { buku } from "../../../data/buku.js";
import { pengguna } from "../../../data/pengguna.js";

export default async function getAllBuku(req, res) {
    try {
        let hasAccess = false;
        pengguna.forEach((user) => {
            if (
                user.username === req.body.username &&
                user.password === req.body.password
            ) {
                hasAccess = true;
            }
        });

        if (hasAccess) {
            return res.status(200).send(buku);
        } else {
            return res.status(400).send({
                status: "invalid",
                msg: "username atau password salah!",
            });
        }
    } catch (error) {
        console.error(
            "!! ERROR : ./src/function/buku/getAllBuku.js !!\n\n",
            error
        );
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
