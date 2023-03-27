const { uploadFile, getFile } = require("../s3");

const fs = require("fs")
const util = require("util")
const unlinkFile = util.promisify(fs.unlink)

const multer  = require("multer");
const upload = multer({ dest: "uploads/" });


exports.uploads = upload.single("myimage"), async (req, res) => {
    const file = req.file;
    console.log(file)
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    res.send("ok");
};


exports.read = (req, res) => {
    res.json(req)
    const key = req.params.key;
    const result = getFile(key);
    result.pipe(res);
}