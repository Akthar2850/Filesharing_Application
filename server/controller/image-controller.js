import File from "../models/file.js";
import path from "path";

export const uploadImage = async (request, response) => {
    console.log("Upload route triggered");
    console.log("File received:", request.file);

    const fileObj = {
        path: path.resolve('uploads', request.file.filename),
        name: request.file.originalname,
        filename: request.file.filename
    };

    try {
        const file = await File.create(fileObj);
        console.log(file);

        const baseUrl = `${request.protocol}://${request.get('host')}`;
        response.status(200).json({ path: `${baseUrl}/file/${file.filename}` });
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message });
    }
};


export const downloadImage = async (request, response) => {
    try {
        // Find by filename instead of _id
        const file = await File.findOne({ filename: request.params.filename });

        if (!file) {
            return response.status(404).json({ error: 'File not found' });
        }

        file.downloadContent++;
        await file.save();

        console.log('Downloading file from:', file.path);

        //  Download with original name
        response.download(file.path, file.name);
    } catch (error) {
        console.error(error.message);
        return response.status(500).json({ error: error.message });
    }
};
