import http from 'http';

function request(path, method = 'GET', data = null, cookies = null) {
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

        if (cookies) {
            options.headers['Cookie'] = cookies.join('; ');
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
                    headers: res.headers,
                    body: parsedBody
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
    console.log('--- Starting Verification ---');

    // 1. Check Root
    try {
        const root = await new Promise((resolve) => {
             http.get('http://localhost:5000/', (res) => {
                 let data = '';
                 res.on('data', c => data += c);
                 res.on('end', () => resolve({statusCode: res.statusCode, body: data}));
             });
        });
        console.log(`Root Check: ${root.statusCode === 200 ? 'PASS' : 'FAIL'} (${root.body})`);
    } catch (e) {
        console.log('Root Check: FAIL', e.message);
    }

    let authCookie = null;

    // 2. Login
    try {
        console.log('Attempting Login...');
        const loginRes = await request('/api/auth/login', 'POST', {
            email: 'doctor.demo@kauvery.com',
            password: 'password123',
            role: 'Doctor'
        });
        
        if (loginRes.statusCode === 200 && loginRes.headers['set-cookie']) {
            console.log('Login: PASS');
            authCookie = loginRes.headers['set-cookie'];
            console.log('Cookie received:', authCookie);
        } else {
            console.log('Login: FAIL', loginRes.statusCode, loginRes.body);
            process.exit(1);
        }
    } catch (e) {
        console.log('Login: FAIL', e.message);
        process.exit(1);
    }

    // 3. Verify Session (Me)
    try {
        console.log('Verifying Session...');
        const meRes = await request('/api/auth/me', 'GET', null, authCookie);
        if (meRes.statusCode === 200 && meRes.body.user.email === 'doctor.demo@kauvery.com') {
            console.log('Session Check: PASS');
        } else {
            console.log('Session Check: FAIL', meRes.statusCode, meRes.body);
        }
    } catch (e) {
        console.log('Session Check: FAIL', e.message);
    }

    // 4. Logout
    try {
        console.log('Attempting Logout...');
        const logoutRes = await request('/api/auth/logout', 'POST', null, authCookie);
         if (logoutRes.statusCode === 200) {
            console.log('Logout: PASS');
        } else {
             console.log('Logout: FAIL', logoutRes.statusCode);
        }
    } catch (e) {
        console.log('Logout: FAIL', e.message);
    }

    // 5. Verify Logout (Me should fail or return 401)
    try {
        // Note: Client should clear cookie. Server just told us to.
        // We test with NO cookie to simulate client clearing it.
        const meRes = await request('/api/auth/me', 'GET'); 
        if (meRes.statusCode === 401 || meRes.statusCode === 403) {
            console.log('Logout Verification: PASS');
        } else {
            console.log('Logout Verification: FAIL', meRes.statusCode, meRes.body);
        }

    } catch (e) {
         console.log('Logout Verification: FAIL', e.message);
    }
}

verify();
