import File from "../models/file.js";



export const uploadImage = async (request,response) => {
        const fileObj = {
            path: request.file.path,
            name: request.file.originalname
        }


        try {
            const file = await File.create(fileObj);
            console.log(file);
    
            // Dynamically construct the base URL
            const baseUrl = `${request.protocol}://${request.get('host')}`;
    
            // Send the full file path in the response
            response.status(200).json({ path: `${baseUrl}/file/${file._id}` });
        } catch (error) {
            console.error(error.message);
            response.status(500).json({ error: error.message });
        }

}


export const downloadImage = async (request, response) => {
    try {
        // Find file by ID
        const file = await File.findById(request.params.fileId);

        // Handle case where file is not found
        if (!file) {
            return response.status(404).json({ error: 'File not found' });
        }

        // Increment download count and save
        file.downloadContent++;
        await file.save();

        // Download the file
        response.download(file.path, file.name);
    } catch (error) {
        console.error(error.message);
        return response.status(500).json({ error: error.message });
    }
}
