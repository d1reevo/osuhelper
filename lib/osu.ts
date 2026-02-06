import axios from 'axios';
import { prisma } from './prisma';
import { decrypt, encrypt } from './crypto';
import { addSeconds } from 'date-fns';

const OSU_API_BASE = 'https://osu.ppy.sh/api/v2';
const TOKEN_URL = 'https://osu.ppy.sh/oauth/token';

export async function getOsuToken(userId: string) {
  const connection = await prisma.osuConnection.findUnique({
    where: { userId },
  });

  if (!connection) throw new Error('Osu connection not found');

  // Check if expired (give 30 sec buffer)
  if (new Date() < new Date(connection.expiresAt.getTime() - 30000)) {
    return connection.accessToken;
  }

  // Refresh token
  try {
    const decryptedRefresh = decrypt(connection.refreshToken);
    
    const response = await axios.post(TOKEN_URL, {
      client_id: process.env.OSU_CLIENT_ID,
      client_secret: process.env.OSU_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: decryptedRefresh,
    });

    const { access_token, refresh_token, expires_in } = response.data;

    // Update DB
    await prisma.osuConnection.update({
      where: { userId },
      data: {
        accessToken: access_token,
        refreshToken: encrypt(refresh_token),
        expiresAt: addSeconds(new Date(), expires_in),
      },
    });

    return access_token;
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw new Error('Failed to refresh token');
  }
}

export async function fetchOsu(endpoint: string, userId: string, params = {}) {
  const token = await getOsuToken(userId);
  try {
    const response = await axios.get(`${OSU_API_BASE}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'x-api-version': '20220705',
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}`, error);
    throw error;
  }
}
