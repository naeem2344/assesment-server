const { validateuser } = require("../utils/user.validation");
const UserSchema = require('../schema/user.schema');
const bycript = require('bcrypt');
const jwt = require('jsonwebtoken');





const saltRound = 9;
const secrateKey = 'sdhj@werkjh4564';

const userRegistration = async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;
    try {
        if (!validateuser(name, 'name')) {
            return res.status(404).send({
                status: false,
                message: 'Name is not valid or atleast 5 letter'
            })
        }
        if (!validateuser(email, 'email')) {
            return res.status(404).send({
                status: false,
                message: 'Eamil is not valid. Please provide a valid email'
            })
        }

        if (password !== confirmpassword) {
            return res.status(404).send({
                status: false,
                message: 'Password is miss matched'
            })
        }

        if (!validateuser(password, 'password')) {
            return res.status(404).send({
                status: false,
                message: 'Password is not valid'
            })
        }

        const isAlreadyPresent = await UserSchema.findOne({ email: email });


        if (isAlreadyPresent && Object.keys(isAlreadyPresent).length > 0) {
            return res.status(409).send({
                status: false,
                message: 'User already present'
            })
        }
        const hashedPassword = await bycript.hash(password, saltRound)

        const modelInstance = await UserSchema.create({
            name,
            email,
            password: hashedPassword
        });

        await modelInstance.save();

        res.status(200).send({
            status: true,
            message: 'Registration successed'
        });


    } catch (error) {
        console.log(error)
        res.status(500).send({ error: "Something went wrong" });
    }
};



const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!validateuser(email, 'email')) {
            return res.status(404).send({
                status: false,
                message: 'Eamil is not valid. Please provide a valid email'
            })
        }


        if (!validateuser(password, 'password')) {
            return res.status(404).send({
                status: false,
                message: 'Password is not valid'
            })
        }


        const isValidUser = await UserSchema.findOne({ email });

        if (!isValidUser) {
            return res.status(404).send({
                status: false,
                message: 'You have no account'
            })
        }

        const isPasswordmatched = await bycript.compare(password, isValidUser.password);

        if (!isPasswordmatched) {
            return res.status(400).json({
                success: false,
                message: "Password mismatch"
            });
        }
        const { name, _id } = isValidUser;
        const payload = {
            name,
            email: isValidUser.email,
            _id
        }
        const token = await jwt.sign(payload, secrateKey, { expiresIn: '24h' });
        res.cookie('token', token, {
            expires: new Date(Date.now() + 86400000), // for 24h
            secure: true,
            httpOnly: true
        });


        const auth = {
            email: isValidUser.email,
            name: isValidUser.name,
            _id: isValidUser._id
        }
        res.status(200).send({
            status: true,
            message: "You have logged in successfully",
            auth,
            token
        });


    } catch (error) {
        console.log(error)
        res.status(500).send({ error: "Something went wrong" });
    }
}



const logoutUser = async (req, res) => {
    try {
        
        res.cookie('token', null, {
            expires: 0,
            secure: true,
            httpOnly: true
        });

        res.status(200).send({
            status: true,
            message: 'User logout successfull'
        })
    } catch (error) {
        res.status(500).send({ error: "Something went wrong" });
    }
}

module.exports = { userRegistration, userLogin, logoutUser };
