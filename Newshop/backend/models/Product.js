const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountPrice: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  inventory: {
    quantity: {
      type: Number,
      required: true,
      min: 0
    }
  },
  avgRating: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);