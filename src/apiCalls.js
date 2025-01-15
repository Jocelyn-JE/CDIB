import axios from 'axios';
import https from 'https';
import fs from 'fs';
import 'dotenv/config';

// Disable SSL verification
const agent = new https.Agent({
    rejectUnauthorized: false,
});
const auth_header = { headers: { Authorization: `Bearer ${process.env.CRAFTY_API_TOKEN}` }, httpsAgent: agent };

const API_URL = 'https://' + process.env.CRAFTY_API_URL + ':8443/api/v2/servers';
const SERVER_ID = process.env.CRAFTY_SERVER_ID;

export async function sendServerAction(action, sucessmsg, errormsg) {
    try {
        const response = await axios.post(`${API_URL}/${SERVER_ID}/action/${action}`, {}, auth_header);

        if (response.data.status === 'ok') {
            return sucessmsg;
        }
        else {
            return errormsg + JSON.stringify(response.data);
        }
    }
    catch (error) {
        console.error(error);
        return `Error performing action '${action}': ${error.message}`;
    }
}

export async function sendServerSTDIn(cmd, sucessmsg, errormsg) {
    try {
        const response = await axios.post(`${API_URL}/${SERVER_ID}/stdin`, cmd, auth_header);

        if (response.data.status === 'ok') {
            return sucessmsg;
        }
        else {
            return errormsg + JSON.stringify(response.data);
        }
    }
    catch (error) {
        console.error(error);
        return `Error performing command '${cmd}': ${error.message}`;
    }
}

export async function getServerStats(errormsg) {
    try {
        const response = await axios.get(`${API_URL}/${SERVER_ID}/stats`, auth_header);

        fs.writeFile('./api_response.json', JSON.stringify(response.data, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return;
            }
            console.log('Data successfully saved to file:', './api_response.json');
        });

        if (response.data.status === 'ok') {
            return response;
        }
        else {
            return errormsg;
        }
    }
    catch (error) {
        console.error(error);
        return `Error getting stats: ${error.message}`;
    }
}