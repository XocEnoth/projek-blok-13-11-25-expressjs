import { list_peminjaman } from "../../../data/list_peminjaman.js";
import { pengguna } from "../../../data/pengguna.js";
import { buku } from "../../../data/buku.js";
import checkSession from "../pengguna/checkSession.js";

export default async function getAllListPeminjaman(req, res) {
    try {
        let listPinjaman = [];
        let hasAccess = await checkSession(["admin", "staff"]);

        if (hasAccess !== true) {
            return res.status(400).send({
                status: "invalid",
                msg: "maaf, kami tidak bisa menyelesaikan proses yang anda minta!",
            });
        }

        list_peminjaman.forEach((list) => {
            pengguna.forEach((user) => {
                buku.forEach(async (book) => {
                    if (
                        list?.id_buku === book?.id &&
                        list?.id_pengguna === user?.id
                    ) {
                        await listPinjaman.push({
                            id: list.id,
                            id_pengguna: list.id_pengguna,
                            id_buku: list.id_buku,
                            username: user.username,
                            buku: book.buku,
                        });
                    }
                });
            });
        });

        return res.status(200).send({
            status: "success",
            list_peminjaman: listPinjaman,
        });
    } catch (error) {
        console.error(
            "!! ERROR : ./src/function/list_peminjaman/getAllListPeminjaman.js !!\n\n",
            error
        );
        return res.status(500).send({
            status: "Internal Server Error",
            msg: "Internal Server Error",
        });
    }
}
