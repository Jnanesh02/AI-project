const express = require("express");
const router = express.Router();

const FormModel= require("../../model/assistanceForm");

// POST route to create a new form
router.post('/createforms', async (req, res) => {
    try {
    
        const formData = new FormModel(req.body);; // Assuming the form data is sent in the request body

        await formData.save();
        res.status(201).json(formData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// GET route to retrieve all forms
router.get('/getformsdetails', async (req, res) => {
    try {
        const forms = await FormModel.find().populate("assistanceInstructionId");
        res.status(200).json(forms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

