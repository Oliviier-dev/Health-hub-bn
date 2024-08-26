import axios from 'axios';
import dotenv from 'dotenv';
import moment from 'moment';

dotenv.config();

const api_base_url = 'https://api.zoom.us/v2';

const getBasicAuthHeader = () => {
    const clientId = process.env.ZOOM_CLIENT_ID;
    const clientSecret = process.env.ZOOM_CLIENT_SECRET;
    const authString = `${clientId}:${clientSecret}`;
    return Buffer.from(authString).toString('base64');
};

const generateRandomPassword = (length = 5) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
};

// Function to get the access token
const getAccessToken = async () => {
    try {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`,
            headers: {
                Authorization: `Basic ${getBasicAuthHeader()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        const response = await axios.request(config);
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw new Error('Unable to retrieve access token');
    }
};

export const createZoomMeeting = async (topic, start_time) => {
    try {
        const access_token = await getAccessToken();
        const formattedStartTime = moment(start_time).utc().format();

        const headers = {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        };

        const password = generateRandomPassword();
        const duration = 30;

        let data = JSON.stringify({
            topic: topic,
            type: 2,
            start_time: formattedStartTime,
            duration: duration,
            timezone: 'UTC',
            password: password,
            settings: {
                allow_multiple_devices: true,
                join_before_host: true,
                waiting_room: false,
            },
        });

        const meetingResponse = await axios.post(`${api_base_url}/users/me/meetings`, data, {
            headers,
        });

        if (meetingResponse.status !== 201) {
            return 'Unable to generate meeting link';
        }

        const response_data = meetingResponse.data;

        const content = {
            meeting_url: response_data.join_url,
            meetingTime: response_data.start_time,
            purpose: response_data.topic,
            duration: response_data.duration,
            message: 'Success',
            password: password,
            status: 1,
        };

        return content;
    } catch (e) {
        console.log(e);
    }
};
