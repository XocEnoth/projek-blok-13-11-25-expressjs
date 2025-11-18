import { pengguna } from "../../../data/pengguna.js";
import { buku } from "../../../data/buku.js";

export default async function deleteBuku(req, res) {
    try {
        const id = Number(req.params.id);
        let hasAccess = false;
        let status = false;

        pengguna.forEach((user) => {
            if (
                user.username === req.body.username &&
                user.password === req.body.password &&
                (user.role === "staff" || user.role === "admin")
            ) {
                hasAccess = true;
            }
        });

        if (hasAccess) {
            if (!id) {
                return res.status(400).send({
                    status: "invalid",
                    msg: "anda tidak memberikan data dengan benar!",
                });
            }

            buku.forEach((list, index) => {
                if (list.id === id) {
                    buku.splice(index, 1);
                    status = true;
                }
            });

            if (status) {
                return res.status(200).send({
                    status: "success",
                    msg: "buku berhasil di hapus",
                });
            } else {
                return res.status(400).send({
                    status: "invalid",
                    msg: "maaf, kami tidak bisa menemukan data yang anda cari!",
                });
            }
        } else {
            return res.status(400).send({
                status: "invalid",
                msg: "maaf, kami tidak bisa menyelesaikan proses yang anda minta!",
            });
        }
    } catch (error) {
        console.error(
            "!! ERROR : ./src/function/list_peminjaman/deleteListPeminjaman.js !!\n\n",
            error
        );
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
