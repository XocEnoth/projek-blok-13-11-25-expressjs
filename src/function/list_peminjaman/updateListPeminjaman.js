import { list_peminjaman } from "../../../data/list_peminjaman.js";
import { pengguna } from "../../../data/pengguna.js";
import { buku } from "../../../data/buku.js";
import checkSession from "../pengguna/checkSession.js";

export default async function updateListPeminjaman(req, res) {
    try {
        const id = Number(req?.params?.id);
        const id_pengguna = req?.body?.id_pengguna;
        const id_buku = req?.body?.id_buku;

        let listPinjaman = [];
        let beforeChanges;
        let afterChanges;
        let hasAccess = await checkSession();

        if (hasAccess !== true) {
            return res.status(400).send({
                status: "invalid",
                msg: "maaf, kami tidak bisa menyelesaikan proses yang anda minta!",
            });
        }

        if (!id || !id_pengguna || !id_buku) {
            return res.status(400).send({
                status: "invalid",
                msg: "anda tidak memberikan data dengan benar!",
            });
        }

        list_peminjaman.forEach((list) => {
            if (list?.id === id) {
                beforeChanges = {
                    id: list.id,
                    id_pengguna: list.id_pengguna,
                    id_buku: list.id_buku,
                };

                afterChanges = {
                    id: id,
                    id_pengguna: id_pengguna,
                    id_buku: id_buku,
                };

                list.id_pengguna = id_pengguna;
                list.id_buku = id_buku;
            }
        });

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
            beforeChanges: beforeChanges,
            afterChanges: afterChanges,
            list_peminjaman: listPinjaman,
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
