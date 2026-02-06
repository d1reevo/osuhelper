// Setup for node scripts to run cron/jobs easily
const { spawn } = require('child_process');
const cron = require('node-cron');
const axios = require('axios');

// This script is meant to be run alongside the next.js app, e.g. "node scripts/cron.js"
// Ensure APP_URL and JOB_SECRET are in env or hardcoded for local test

// NOTE: In production (Vercel), use Vercel Cron.
// In production (VPS), use pm2 to run this script.

const APP_URL = process.env.APP_URL || 'http://localhost:3000';
const JOB_SECRET = process.env.JOB_SECRET || 'secret-job-key';

console.log(`Starting Cron Service for ${APP_URL}`);

// Every 1 minute - Refresh Recent Scores
cron.schedule('* * * * *', async () => {
    console.log('Running SCORES job...');
    try {
        await axios.get(`${APP_URL}/api/jobs/run?secret=${JOB_SECRET}&type=SCORES`);
    } catch (e) {
        console.error('Error running scores job', e.message);
    }
});

// Every 10 minutes - Update Profiles
cron.schedule('*/10 * * * *', async () => {
    console.log('Running PROFILE job...');
     try {
        await axios.get(`${APP_URL}/api/jobs/run?secret=${JOB_SECRET}&type=PROFILE`);
    } catch (e) {
         console.error('Error running profile job', e.message);
    }
});

// Every day at 3 AM - Snapshots
cron.schedule('0 3 * * *', async () => {
    console.log('Running SNAPSHOT job...');
     try {
        await axios.get(`${APP_URL}/api/jobs/run?secret=${JOB_SECRET}&type=SNAPSHOT`);
    } catch (e) {
         console.error('Error running snapshot job', e.message);
    }
});
