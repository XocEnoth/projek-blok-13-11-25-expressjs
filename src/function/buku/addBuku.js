import { pengguna } from "../../../data/pengguna.js";
import { buku } from "../../../data/buku.js";

export default async function addBuku(req, res) {
    try {
        const { nama_buku } = req.body;
        let hasAccess = false;

        pengguna.forEach((user) => {
            if (
                user.username === req.body.username &&
                user.password === req.body.password &&
                (user.role === "admin" || user.role === "staff")
            ) {
                hasAccess = true;
            }
        });

        if (hasAccess) {
            if (!nama_buku) {
                return res.status(400).send({
                    status: "invalid",
                    msg: "anda tidak memberikan data dengan benar!",
                });
            }

            buku.push({
                id: buku[buku.length - 1].id + 1,
                buku: nama_buku,
            });

            return res.status(200).send({
                status: "success",
                msg: "buku berhasil ditambahkan",
            });
        } else {
            return res.status(400).send({
                status: "invalid",
                msg: "maaf, kami tidak bisa menyelesaikan proses yang anda minta!",
            });
        }
    } catch (error) {
        console.error(
            "!! ERROR : ./src/function/buku/addBuku.js !!\n\n",
            error
        );
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
