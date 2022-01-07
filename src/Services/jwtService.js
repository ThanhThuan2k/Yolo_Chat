import sign from 'jwt-encode';

const secret = "thuanhuynh.190800@gmail.com";

const jwtEncode = data => {
    const jwt = sign(data, secret);
    return jwt;
}

export {
    jwtEncode
}