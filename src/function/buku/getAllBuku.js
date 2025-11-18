import { buku } from "../../../data/buku.js";
import checkSession from "../pengguna/checkSession.js";

export default async function getAllBuku(req, res) {
    try {
        let hasAccess = await checkSession(["admin", "staff", "user"]);

        if (hasAccess !== true) {
            return res.status(400).send({
                status: "invalid",
                msg: "maaf, kami tidak bisa menyelesaikan proses yang anda minta!",
            });
        }

        return res.status(200).send(buku);
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
