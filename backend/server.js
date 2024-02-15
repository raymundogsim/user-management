// server.js

const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const contactInformationRoutes = require('./routes/contactInformationRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes')
const areaRoutes = require('./routes/areaRoutes');
const sequelize = require('./utils/database');
const cors = require('cors');
const PORT = process.env.PORT || 4001;


app.use(cors())
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/contact-information', contactInformationRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/area', areaRoutes);

sequelize.sync({
    // force: true
}).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
