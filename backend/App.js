const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');  
const doctorantRoutes = require('./routes/doctorantRoutes');
const demandesRoutes = require('./routes/demandesRoutes');
const dossierSoutenanceRoutes = require('./routes/dossierSoutenanceRoutes');
const userRoutes = require('./routes/userRoutes');
const reunionRoutes = require('./routes/reunionRoutes');
const encadrementRoutes = require('./routes/encadrementRoutes'); 
const dashboardRoutes = require('./routes/dashboardRoutes');
const eventRoutes = require('./routes/eventRoutes');
const adminRoutes = require('./routes/adminRoutes');
const documentRoutes = require('./routes/documentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');



require('dotenv').config();

app.use(cors()); 

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctorant', doctorantRoutes); 
app.use('/api/demandes', demandesRoutes);
app.use('/api/dossierSoutenance', dossierSoutenanceRoutes); 

app.use('/api/user', userRoutes);
app.use('/api/reunions', reunionRoutes);

app.use('/api/encadrement', encadrementRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api', eventRoutes);

app.use('/api/admin', adminRoutes);
app.use('/api', documentRoutes);

app.use('/api', uploadRoutes);


module.exports = app;
