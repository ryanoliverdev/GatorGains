/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        nutritionixKey: process.env.NUTRITIONIX_KEY,
        nutritionixAppID: process.env.NUTRITIONIX_APP_ID,
        openAIKey: process.env.OPENAI_API_KEY
    },
};

export default nextConfig;
