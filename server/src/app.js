const express = require('express');
const cors = require('cors');
const MainRoutes = require('./routes');
require('dotenv').config()
const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.use("/api/v1", MainRoutes);

const API_URL = process.env.TONCENTER_API_URL || 'https://toncenter.com/api/v2';
const TARGET_ADDRESS = process.env.TARGET_ADDRESS || 'EQAmst1AJ64UHwNa3U10WAOey-KwJCmBIb21_jyjVfmsmn2h';
const validateInput = (walletAddress, amountInNanotons) => {
    if (!walletAddress || typeof walletAddress !== 'string') {
        return 'Invalid or missing walletAddress';
    }
    if (!amountInNanotons || isNaN(amountInNanotons)) {
        return 'Invalid or missing amountInNanotons';
    }
    return null;
};

app.post('/api/v1/verify-transaction', async (req, res) => {
    const { walletAddress, amountInNanotons } = req.body;

    // Validate Input
    const validationError = validateInput(walletAddress, amountInNanotons);
    if (validationError) {
        return res.status(400).json({ success: false, message: validationError });
    }
    console.log(`${API_URL}/getTransactions?address=${walletAddress}`);
    
    try {
        // Fetch Transactions
        const response = await fetch(`${API_URL}/getTransactions?address=${walletAddress}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch transactions. Status: ${response.status}`);
        }

        const { result: transactions } = await response.json();

        // Check Transactions
        const matchingTransaction = transactions?.find(transaction =>
            transaction?.out_msgs?.some(msg => msg?.destination === TARGET_ADDRESS)
        );

        if (matchingTransaction) {
            return res.status(200).json({ success: true, transaction: matchingTransaction });
        }

        res.status(400).json({ success: false, message: 'Transaction not verified', transactions });

    } catch (error) {
        console.error('Error verifying transaction:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get("/manifest", async (req, res) => {
    res.send({
        "url": "https://hyper.bull",
        "name": "Hyper bull",
        "iconUrl": "https://i.ibb.co.com/sjv5Rfr/IMG-20240923-WA0003.jpg"
    });
})

app.use((req, res, next) => {
    res.status(404).send({
        msg: 'no routes in this location...',
        statusCode: 200,
        data: []
    })
})

app.use((err, req, res, next) => {
    res.status(500).send({
        stack: process.env.MODE === 'DEV' ? err.message : undefined,
        msg: process.env.MODE !== 'DEV' ? 'something went wrong' : undefined,
        statusCode: 200,
        data: []
    })
})

app.get('/', async (req, res) => {
    res.send('Server is okay')
})

module.exports = {
    app
}