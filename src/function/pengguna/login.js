import { pengguna } from "../../../data/pengguna.js";
import { cookies } from "../../../data/cookies.js";

export default function login(req, res) {
    const { username, password } = req.body;
    let success = false;

    pengguna.forEach((user) => {
        if (user.username === username && user.password === password) {
            cookies.session.uid = user.id;
            success = true;
        }
    });

    if (success) {
        return res.status(200).send({
            status: "success",
            msg: "berhasil login!",
        });
    }
    return res.status(400).send({
        status: "invalid",
        msg: "maaf, kami tidak bisa menyelesaikan proses yang anda minta!",
    });
}
