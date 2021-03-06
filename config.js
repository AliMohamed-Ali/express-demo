require('dotenv').config();

const requiredEnvs = ['JWT_SECRETE','MONGO_URI'];
const missingEnvs = requiredEnvs.filter(envName=>!process.env[envName]);
if(missingEnvs.length){
    throw new Error(`Missing required envs ${missingEnvs}`);
}

module.exports = {
    jwtSecret:process.env.JWT_SECRETE,
    saltRounds:process.env.SALT_ROUND || 10,
    mongoURI:process.env.MONGO_URI,
    port:process.env.PORT||3000
}