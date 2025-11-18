import { buku } from "../../../data/buku.js";
import checkSession from "../pengguna/checkSession.js";

export default async function updateBuku(req, res) {
    try {
        const id = Number(req.params.id);
        const { nama_buku } = req.body;
        let hasAccess = await checkSession();

        if (hasAccess !== true) {
            return res.status(400).send({
                status: "invalid",
                msg: "maaf, kami tidak bisa menyelesaikan proses yang anda minta!",
            });
        }

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
