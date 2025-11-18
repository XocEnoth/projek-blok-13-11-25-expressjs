import { pengguna } from "../../../data/pengguna.js";
import { cookies } from "../../../data/cookies.js";

export default function checkSession(roles) {
    try {
        let isExists = false;
        pengguna.forEach((user) => {
            roles.forEach((role) => {
                if (user.id === cookies.session.uid && user.role === role) {
                    isExists = true;
                }
            });
        });
        return isExists;
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
