import { pengguna } from "../../../data/pengguna.js";
import { cookies } from "../../../data/cookies.js";

export default function checkSession() {
    try {
        pengguna.forEach((user) => {
            if (user.id === cookies.session.uid) {
                return true;
            }
            return false;
        });
    } catch (error) {
        console.error(
            "!! ERROR : ./src/function/pengguna/checkSession.js !!\n\n",
            error
        );
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
