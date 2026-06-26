require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Data files
const USERS_FILE = './data/users.json';
const PRODUCTS_FILE = './data/products.json';
const ORDERS_FILE = './data/orders.json';

// Ensure data directories exist
const DATA_DIR = './data';
const ensureDataDir = async () => {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
};

// Initialize data files
const initializeDataFiles = async () => {
  await ensureDataDir();
  
  // Users
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, JSON.stringify([], null, 2));
  }
  
  // Products
  try {
    await fs.access(PRODUCTS_FILE);
  } catch {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify([
      {
        id: 1,
        name: 'آیفون ۱۴',
        description: 'گوشی اپل آیفون ۱۴',
        price: 45000000,
        category: 'موبایل',
        brand: 'Apple',
        inventory: { quantity: 10 },
        image: '',
        isActive: true
      },
      {
        id: 2,
        name: 'مک‌بوک پرو',
        description: 'لپ‌تاپ اپل مک‌بوک پرو',
        price: 85000000,
        category: 'لپ‌تاپ',
        brand: 'Apple',
        inventory: { quantity: 5 },
        image: '',
        isActive: true
      },
      {
        id: 3,
        name: 'ایرپادز پرو',
        description: 'هدفون بی‌سیم اپل',
        price: 8000000,
        category: 'هدفون',
        brand: 'Apple',
        inventory: { quantity: 20 },
        image: '',
        isActive: true
      }
    ], null, 2));
  }
  
  // Orders
  try {
    await fs.access(ORDERS_FILE);
  } catch {
    await fs.writeFile(ORDERS_FILE, JSON.stringify([], null, 2));
  }
};

// Read data from files
const readUsers = async () => JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
const readProducts = async () => JSON.parse(await fs.readFile(PRODUCTS_FILE, 'utf8'));
const readOrders = async () => JSON.parse(await fs.readFile(ORDERS_FILE, 'utf8'));

// Write data to files
const writeUsers = async (data) => await fs.writeFile(USERS_FILE, JSON.stringify(data, null, 2));
const writeProducts = async (data) => await fs.writeFile(PRODUCTS_FILE, JSON.stringify(data, null, 2));
const writeOrders = async (data) => await fs.writeFile(ORDERS_FILE, JSON.stringify(data, null, 2));

// Initialize data files
initializeDataFiles().then(() => {
  console.log('✅ Data files initialized');
});

// API Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    
    const users = await readUsers();
    const existingUser = users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = {
      id: Date.now(),
      username,
      email,
      password,
      phone,
      role: 'customer'
    };
    
    users.push(user);
    await writeUsers(users);
    
    res.status(201).json({
      token: 'fake-token-' + user.id,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const users = await readUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    res.json({
      token: 'fake-token-' + user.id,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const { page = 1, limit = 12, category, search } = req.query;
    
    let products = await readProducts();
    products = products.filter(p => p.isActive);
    
    if (category) {
      products = products.filter(p => p.category === category);
    }
    
    if (search) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    const start = (parseInt(page) - 1) * parseInt(limit);
    const end = start + parseInt(limit);
    const paginatedProducts = products.slice(start, end);
    
    res.json({
      products: paginatedProducts,
      totalPages: Math.ceil(products.length / limit),
      currentPage: parseInt(page),
      total: products.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const products = await readProducts();
    const product = products.find(p => p.id == req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Handle other frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌐 Frontend available at http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api/products`);
});