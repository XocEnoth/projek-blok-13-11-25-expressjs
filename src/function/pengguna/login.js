import { pengguna } from "../../../data/pengguna.js";
import { cookies } from "../../../data/cookies.js";

export default function login(req, res) {
    try {
        const username = req?.body?.username;
        const password = req?.body?.password;
        let success = false;

        pengguna.forEach((user) => {
            if (user?.username === username && user?.password === password) {
                cookies.session.uid = user?.id;
                success = true;
            }
        });

        if (success) {
            return res.status(200).send({
                status: "success",
                msg: "selamat, anda berhasil login!",
            });
        }

        return res.status(400).send({
            status: "invalid",
            msg: "maaf, kami tidak bisa menyelesaikan proses yang anda minta!",
        });
    } catch (error) {
        console.error(
            "!! ERROR : ./src/function/pengguna/login.js !!\n\n",
            error
        );
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
