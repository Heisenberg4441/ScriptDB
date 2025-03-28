import { db, server } from '../kernel.js';

console.log('index.controller.ts is running');

server.post("/create-table", (req, res) => {
    try {
        const { tableName, schema } = req.body;
        db.createTable(tableName, schema);
        res.json({ message: `Table ${tableName} created successfully!` });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

server.post("/insert", (req, res) => {
    try {
        const { tableName, row } = req.body;
        db.insert(tableName, row);
        res.json({ message: "Row inserted successfully!" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

server.get("/data/:tableName", (req, res) => {
    try {
        const { tableName } = req.params;
        const data = db.getTableData(tableName);
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

server.delete('/data/:table', (req, res) => {
    try {
        const { table } = req.params;
        const filter = req.body;

        db.delete(table, filter);
        res.json({ message: 'Record deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: (error as Error).message });
    }
});

server.put('/data/:table', (req, res) => {
    try {
        const { table } = req.params;
        const updateData = req.body;
        db.update(table, updateData);
        res.json({ message: 'Record updated successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});
