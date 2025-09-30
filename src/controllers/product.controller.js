const CustomizationSchema = require("../schema/model.customization.schema");
const ModelSchema = require("../schema/model.schema");

const uploadProducts = async (req, res) => {
    console.log("hello")
    try {
        const modelFiles = req.files['3d_model'];
        const textureFiles = req.files['3d_texture'];
        const modelJpgFile = req.files['jpg_model'];
        const { _id } = req.user;

        if (!modelFiles || modelFiles.length === 0) {
            return res.status(400).json({ error: "3D model file is required" });
        }
        const modelFile = modelFiles[0];
        const jpg = modelJpgFile[0];

        const jpgURL = jpg.path;
        const modelFileUrl = modelFile.path;
        const texture = textureFiles?.map(file => file.path)

        const modelInstance = await ModelSchema.create({
            modeljpg: jpgURL,
            model: modelFileUrl,
            texture
        });

        await modelInstance.save();

        res.status(201).send({
            status: true,
            message: 'Product uploaded successfully',
            modelFileUrl,
            textureFiles: texture
        });
    } catch (error) {
        console.log('hello', error[0], error[1]);
        res.status(500).send({
            status: false,
            message: 'Internal server error'
        });
    }
};


const getAllProducts = async (req, res) => {
    try {
        const { _id } = req.user;
        const allProducts = await ModelSchema.find();
        res.status(201).send({
            status: true,
            message: 'Product Fetched',
            data: allProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: false,
            message: 'Internal server error'
        });
    }
}


const saveCustomization = async (req, res) => {
    const { productName, name, url } = req.body;

    const { _id } = req.user;
    try {
        
        const isPresent = await CustomizationSchema.findOne({ productName, userId: _id });

        // if there is no record
        if (!isPresent) {
            const obj = {
                userId: _id,
                productName,
                customization: [{ name, url }]
            }

            const objectInstance = await CustomizationSchema.create(obj);
            await objectInstance.save()

            return res.status(201).send({
                status: true,
                message: "Customization saved",
            });
        }


        const { customization } = isPresent;
        // there is record present but user want to update the texture in changes texture
        if (customization.find(item => item.name === name)) {
            const updateCustomization = customization.map(item => {
                return item.name === name ? { ...item, url } : item
            })

            isPresent.customization = updateCustomization;

            await isPresent.save();
            return res.status(200).send({
                status: true,
                message: 'Customization updated'
            })
        }

        // if user want to save new texture
        customization.push({
            url, name
        });

        await isPresent.save();


        return res.status(200).send({
            status: true,
            message: 'Customization updated'
        })


    } catch (error) {

    }
}

const getAllCustomization = async (req,res) =>{
    const { _id } = req.user;
    try {

        const allCustomization = await CustomizationSchema.find({userId: _id});

        res.status(200).send({
            status: true,
            message: "Get all cutomization",
            data: allCustomization
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: false,
            message: 'Internal server error'
        });
    }
}


module.exports = {
    uploadProducts,
    getAllProducts,
    saveCustomization,
    getAllCustomization
}