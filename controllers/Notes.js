const Notes = require("../models/Notes")
const sanitizeHtml = require('sanitize-html');

exports.create = async (req, res) => {
    try {
        const user = req.user
        let title = req.body.title
        let content = req.body.content
        if (user) {
            if (title && content) {
                title = `${title}`.trim()
                content = sanitizeHtml(`${content}`.trim())
                const lastNote = await Notes.findOne({}, { id: 1 }).sort({ id: -1 }).lean()
                const id = lastNote ? (lastNote?.id + 1) : 1
                const note = new Notes({
                    id: id,
                    title: title,
                    content: content,
                    iduser: user?.id
                })
                await note.save()

                res.status(200).json({
                    result: true,
                    code: 200,
                    message: `success`
                })
            } else {
                res.status(200).json({
                    result: false,
                    code: 400,
                    message: `missing data`
                })
            }
        } else {
            res.status(200).json({
                result: false,
                code: 403,
                message: `create note unauthorized`
            })
        }
    } catch (error) {
        res.status(200).json({
            result: false,
            code: 500,
            message: `logout ${error?.message}`
        })
    }
}

exports.getUserNotes = async (iduser) => {
    try {
        const idUser = Number(iduser)
        if (idUser) {
            const data = await Notes.find({ iduser: idUser }).sort({ editAt: -1 })
            return data
        } else {
            return []
        }
    } catch (error) {
        return []
    }
}

exports.getNote = async (id, iduser) => {
    try {
        if (id && Number(id) && iduser && Number(iduser)) {
            const note = await Notes.findOne({ id: Number(id), iduser: Number(iduser) })
            return note
        } else {
            return null
        }
    } catch (error) {
        console.log("🚀 ~ exports.getNote= ~ error:", error?.message)
        return null
    }
}