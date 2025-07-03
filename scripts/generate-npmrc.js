/* eslint-disable */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const generateNpmrc = () => {
  try {
    // Read .env file
    const envPath = path.join(dirname, '..', '.env');
    let authToken = '';

    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const tokenMatch = envContent.match(/NPMRC_NODE_AUTH_TOKEN=(.+)/);
      if (tokenMatch) {
        authToken = tokenMatch[1].trim();
      }
    } else {
      // Try to get from environment variable
      authToken = process.env.NPMRC_NODE_AUTH_TOKEN ?? '';
    }

    if (!authToken) {
      console.warn(
        'Warning: NPMRC_NODE_AUTH_TOKEN not found in .env file or environment variables',
      );
    }

    // Read .npmrc.config
    const configPath = path.join(dirname, '..', '.npmrc.config');
    if (!fs.existsSync(configPath)) {
      console.error('Error: .npmrc.config file not found');
      process.exit(1);
    }

    const configContent = fs.readFileSync(configPath, 'utf8');

    // Replace the token
    const npmrcContent = configContent.replace(
      /NPMRC_NODE_AUTH_TOKEN/g,
      authToken,
    );

    // Write .npmrc
    const npmrcPath = path.join(dirname, '..', '.npmrc');
    fs.writeFileSync(npmrcPath, npmrcContent);

    console.log('✅ .npmrc generated successfully');
  } catch (error) {
    console.error('Error generating .npmrc:', error.message);
    process.exit(1);
  }
};

generateNpmrc();
