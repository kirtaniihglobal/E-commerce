const Address = require("../models/address");
const User = require("../models/user");



const addAddress = async (req, res) => {
    try {
        const id = req.user.id;
        const { address, city, pincode, country } = req.body;
        const findUser = await User.findOne({ _id: id });
        if (!findUser) {
            return res.status(404).json({ status: 404, msg: "User not found" });
        }
        const addressData = await Address.findOne({ userId: id });
        if (!addressData) {
            const newAddress = await Address.create({
                userId: id,
                addressData: [
                    {
                        address,
                        city,
                        pincode,
                        country,
                    },
                ],
            });

            return res
                .status(201)
                .json({ status: 201, msg: "Address created successfully", data: newAddress });
        } else {
            addressData.addressData.push({ address, city, pincode, country });
            await addressData.save();
            return res
                .status(200)
                .json({ status: 200, message: "Add New Address", data: addressData });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, msg: "add address error" });
    }
};





const getAllAddress = async (req, res) => {
    try {
        const id = req.user.id;
        const address = await Address.findOne({ userId: id });
        if (!address) {
            return res.status(500).json({ status: 500, msg: "Dont have Address" })
        }
        const fetchAddress = address.addressData

        return res.status(201).json({ status: 200, msg: "Address fetch successfully", data: fetchAddress });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, msg: "Address fetch Failed" });
    }
}
const deleteAddress = async (req, res) => {
    try {
        const id = req.user.id;
        const addId = req.params.id;
        const updatedAddress = await Address.findOneAndUpdate({ userId: id }, { $pull: { addressData: { _id: addId } } }, { new: true });

        return res.status(200).json({ status: 200, msg: "Deleted address successfully", updatedAddress });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, msg: "Delete address error" });
    }
};


const updateAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateId = req.params.id;

        const addressUpdate = await Address.findOneAndUpdate(
            { userId: userId, "addressData._id": updateId },
            {
                $set: {
                    "addressData.$.address": req.body.address,
                    "addressData.$.city": req.body.city,
                    "addressData.$.pincode": req.body.pincode,
                    "addressData.$.country": req.body.country,
                }
            },
            { new: true }
        );

        if (!addressUpdate) {
            return res.status(404).json({ status: 404, msg: "Address not found" });
        }

        return res.status(200).json({ status: 200, msg: "Address updated successfully", addressUpdate });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, msg: "Error updating address" });
    }
};





module.exports = {
    addAddress,
    getAllAddress,
    deleteAddress,
    updateAddress
}