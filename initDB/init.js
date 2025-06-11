import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import data from './data.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_URL = "http://localhost:5000/api/items"

async function seedFoodData(item) {
    const form = new FormData();
    // Fix the image path by using __dirname
    const imagePath = path.join(__dirname, 'frontend_assets', path.basename(item.image));
    // console.log('Looking for image at:', imagePath); // Debug log
    console.log(`posting ${item.name} ...`);
    
    if (!fs.existsSync(imagePath)) {
        console.error(`Image not found at ${imagePath}`);
        return;
    }

    form.append('image', fs.createReadStream(imagePath));
    form.append('name', item.name);
    form.append('price', item.price);
    form.append('description', item.description);
    form.append('category', item.category);
    form.append('_id', item._id);

    try {
        const res = await axios.post(API_URL, form, {
            headers: form.getHeaders(),
        });
        console.log(`✅ Posted: ${item.name} - Status: ${res.status}`);
    } catch (err) {
        console.error(`❌ Error posting ${item.name}:`, err.message);
    }
}

for(let item of data){
    seedFoodData(item);
}