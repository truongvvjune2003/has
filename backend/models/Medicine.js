const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    supplier: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    expiryDate: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("Medicine", medicineSchema);
