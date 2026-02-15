import http from 'http';

function request(path, method = 'GET', data = null, cookie = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (cookie) {
            options.headers['Cookie'] = cookie;
        }

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                let parsedBody = {};
                try {
                     parsedBody = body ? JSON.parse(body) : {};
                } catch (e) {
                     parsedBody = { raw: body };
                }
                resolve({
                    statusCode: res.statusCode,
                    body: parsedBody,
                    headers: res.headers
                });
            });
        });

        req.on('error', (e) => reject(e));

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function verify() {
    console.log('--- Starting Analysis Verification ---');
    let authToken = null;

    // 1. Login
    try {
        console.log('Logging in...');
        const loginRes = await request('/api/auth/login', 'POST', {
            email: 'doctor.demo@kauvery.com',
            password: 'password123',
            role: 'Doctor'
        });

        if (loginRes.statusCode === 200 && loginRes.headers['set-cookie']) {
            authToken = loginRes.headers['set-cookie'][0].split(';')[0];
            console.log('Login: PASS');
        } else {
            console.error('Login: FAIL', loginRes.statusCode);
            process.exit(1);
        }
    } catch (e) {
        console.error('Login Error:', e.message);
        process.exit(1);
    }

    // 2. Test Analysis
    try {
        console.log('Testing Analysis Endpoint...');
        const highRiskData = {
            age: 55,
            vitals: {
                bp: '170/100',
                heartRate: 115,
                temperature: 37.5,
                spo2: 96
            },
            symptoms: ['Chest Pain', 'Sweating']
        };

        const res = await request('/api/analysis/analyze', 'POST', highRiskData, authToken);

        if (res.statusCode === 200) {
            const result = res.body;
            console.log('Result:', JSON.stringify(result, null, 2));
            
            if (result.riskLevel === 'High' && result.department === 'Emergency') {
                console.log('Analysis Test: PASS');
            } else {
                console.error('Analysis Test: FAIL (Incorrect Risk/Dept)');
            }
        } else {
            console.error('Analysis Test: FAIL', res.statusCode, res.body);
        }

    } catch (e) {
        console.error('Analysis Error:', e.message);
    }
}

verify();
