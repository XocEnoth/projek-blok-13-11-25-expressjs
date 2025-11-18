import { pengguna } from "../../../data/pengguna.js";
import { buku } from "../../../data/buku.js";

export default async function updateBuku(req, res) {
    try {
        const id = Number(req.params.id);
        const { nama_buku } = req.body;
        let hasAccess = false;

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
            if (!id || !nama_buku) {
                return res.status(400).send({
                    status: "invalid",
                    msg: "anda tidak memberikan data dengan benar!",
                });
            }

            buku.forEach((book) => {
                if (book.id === id) {
                    book.buku = nama_buku;
                }
            });
            return res.status(200).send({
                status: "success",
                msg: "buku berhasil diupdate",
            });
        } else {
            return res.status(400).send({
                status: "invalid",
                msg: "maaf, kami tidak bisa menyelesaikan proses yang anda minta!",
            });
        }
    } catch (error) {
        console.error(
            "!! ERROR : ./src/function/list_peminjaman/updateListPeminjaman.js !!\n\n",
            error
        );
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
