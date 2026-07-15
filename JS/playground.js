/* ====== PLAYGROUND.JS - Interactive API Tester ====== */

(function () {
    'use strict';

    // ===== MOCK API RESPONSES =====
    const mockResponses = {
        '/api/users': {
            GET: {
                status: 200,
                data: {
                    success: true,
                    count: 3,
                    data: [
                        {
                            id: 1,
                            name: "Clifford Opoku-Sarkodie",
                            email: "cliff@example.com",
                            role: "Backend Engineer",
                            createdAt: "2024-01-15T10:30:00Z"
                        },
                        {
                            id: 2,
                            name: "Jane Developer",
                            email: "jane@example.com",
                            role: "Frontend Engineer",
                            createdAt: "2024-02-20T14:45:00Z"
                        },
                        {
                            id: 3,
                            name: "Alex DevOps",
                            email: "alex@example.com",
                            role: "DevSecOps Engineer",
                            createdAt: "2024-03-10T09:00:00Z"
                        }
                    ]
                }
            }
        },
        '/api/users/1': {
            GET: {
                status: 200,
                data: {
                    success: true,
                    data: {
                        id: 1,
                        name: "Clifford Opoku-Sarkodie",
                        email: "cliff@example.com",
                        role: "Backend Engineer",
                        bio: "Building scalable APIs and secure systems",
                        skills: ["Python", "Node.js", "PostgreSQL", "Docker"],
                        createdAt: "2024-01-15T10:30:00Z"
                    }
                }
            }
        },
        '/api/projects': {
            GET: {
                status: 200,
                data: {
                    success: true,
                    count: 3,
                    data: [
                        {
                            id: 1,
                            name: "Post-Bot",
                            description: "AI-powered social media automation",
                            stack: ["Python", "FastAPI", "Groq LLM", "Docker"],
                            status: "active",
                            github: "https://github.com/cliff-de-tech/Post-Bot"
                        },
                        {
                            id: 2,
                            name: "AuthForge",
                            description: "Enterprise authentication system",
                            stack: ["Node.js", "JWT", "PostgreSQL", "Redis"],
                            status: "active",
                            github: "https://github.com/cliff-de-tech/authforge"
                        },
                        {
                            id: 3,
                            name: "EventFlow",
                            description: "Event-driven microservices platform",
                            stack: ["Python", "RabbitMQ", "Kubernetes"],
                            status: "in-development",
                            github: "https://github.com/cliff-de-tech/eventflow"
                        }
                    ]
                }
            }
        },
        '/api/auth/login': {
            POST: {
                status: 200,
                data: {
                    success: true,
                    message: "Authentication successful",
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTcwNjEyMzQ1NiwiZXhwIjoxNzA2MjA5ODU2fQ.mock_signature_here",
                    expiresIn: "24h",
                    user: {
                        id: 1,
                        email: "user@example.com",
                        role: "developer"
                    }
                }
            }
        },
        '/api/health': {
            GET: {
                status: 200,
                data: {
                    status: "healthy",
                    uptime: "14d 6h 32m",
                    version: "2.1.0",
                    services: {
                        database: "connected",
                        cache: "connected",
                        queue: "connected"
                    },
                    timestamp: new Date().toISOString()
                }
            }
        },
        '/api/cedismart/transactions': {
            GET: {
                status: 200,
                data: {
                    success: true,
                    count: 3,
                    data: [
                        {
                            id: "5f8a61cb-4029-4d64-9b24-9b5d44837dc3",
                            amount: 150.00,
                            transaction_type: "income",
                            description: "MoMo received from Kojo Mensah",
                            category_name: "Other Income",
                            notes: "Parsed SMS: Payment received of GHS 150.00 from Kojo Mensah. Transaction ID: 194827189.",
                            transaction_date: "2026-07-14"
                        },
                        {
                            id: "ab9d107a-40a2-4a0b-9304-45b73dc991bf",
                            amount: 20.00,
                            transaction_type: "expense",
                            description: "MoMo transfer to Kofi Owusu",
                            category_name: "Utilities",
                            notes: "Parsed SMS: You have transferred GHS 20.00 to Kofi Owusu. Fee: GHS 0.20. Transaction ID: 194827190.",
                            transaction_date: "2026-07-13"
                        },
                        {
                            id: "d9e8f7a6-bc5d-4e9f-8a0b-193478952402",
                            amount: 45.00,
                            transaction_type: "expense",
                            description: "Payment to ECG",
                            category_name: "Utilities",
                            notes: "Parsed SMS: Payment of GHS 45.00 made to ECG. Transaction ID: 194827191.",
                            transaction_date: "2026-07-12"
                        }
                    ]
                }
            }
        }
    };

    // ===== DOM ELEMENTS =====
    const methodSelect = document.getElementById('method-select');
    const endpointSelect = document.getElementById('endpoint-select');
    const requestBodySection = document.getElementById('request-body-section');
    const requestBody = document.getElementById('request-body');
    const sendBtn = document.getElementById('send-request');
    const responseOutput = document.getElementById('response-output');
    const statusBadge = document.getElementById('status-badge');
    const responseTime = document.getElementById('response-time');

    if (!sendBtn) return; // Exit if not on playground page

    // ===== SHOW/HIDE REQUEST BODY =====
    function updateRequestBodyVisibility() {
        const endpoint = endpointSelect.value;
        if (endpoint === '/api/auth/login') {
            requestBodySection.style.display = 'block';
            methodSelect.value = 'POST';
            requestBody.placeholder = `{
  "email": "user@example.com",
  "password": "securePassword123"
}`;
            requestBody.value = `{
  "email": "user@example.com",
  "password": "securePassword123"
}`;
        } else if (endpoint === '/api/cedismart/parse-sms') {
            requestBodySection.style.display = 'block';
            methodSelect.value = 'POST';
            requestBody.placeholder = `{
  "sms": "Payment received of GHS 150.00 from John Doe (0241234567). Your new balance is GHS 124.50. Transaction ID: 194827189."
}`;
            requestBody.value = `{
  "sms": "Payment received of GHS 150.00 from John Doe (0241234567). Your new balance is GHS 124.50. Transaction ID: 194827189."
}`;
        } else {
            requestBodySection.style.display = 'none';
            methodSelect.value = 'GET';
        }
        updateMethodColor();
    }

    // ===== UPDATE METHOD SELECT COLOR =====
    function updateMethodColor() {
        const method = methodSelect.value;
        methodSelect.classList.remove('method-get', 'method-post', 'method-put', 'method-delete');
        if (method === 'GET') {
            methodSelect.classList.add('method-get');
        } else if (method === 'POST') {
            methodSelect.classList.add('method-post');
        } else if (method === 'PUT') {
            methodSelect.classList.add('method-put');
        } else if (method === 'DELETE') {
            methodSelect.classList.add('method-delete');
        }
    }

    // ===== SYNTAX HIGHLIGHT JSON =====
    function syntaxHighlight(json) {
        if (typeof json !== 'string') {
            json = JSON.stringify(json, null, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            function (match) {
                let cls = 'json-number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'json-key';
                    } else {
                        cls = 'json-string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'json-boolean';
                } else if (/null/.test(match)) {
                    cls = 'json-null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            }
        );
    }

    // ===== CLIENT-SIDE MOBILE MONEY SMS PARSING COMPILER =====
    function parseSMSClientSide(body) {
        const bodyClean = body.replace(/\s+/g, ' ').trim();
        const bodyLower = bodyClean.toLowerCase();
        
        let amount = 0.0;
        let fee = 0.0;
        let transaction_type = "expense";
        let description = "SMS Import";
        let category_suggestion = "other";
        let reference_id = "mock_" + Math.floor(Math.random() * 100000000);
        let new_balance = 0.0;

        // Received matches (Income)
        // E.g. "received GHS 150.00 from John Doe (0241234567)"
        const rxReceived = /received\s+GHS\s*([\d\.,]+)\s+from\s+([^\.]+?)\s*\((.*?)\)/i.exec(bodyClean) || 
                           /received\s+GHS\s*([\d\.,]+)\s+from\s+([^\.]+)/i.exec(bodyClean);
        
        // Sent matches (Expense)
        // E.g. "transferred GHS 20.00 to Kofi Owusu (0244112233)"
        const rxSent = /transferred\s+GHS\s*([\d\.,]+)\s+to\s+([^\.]+?)\s*\((.*?)\)/i.exec(bodyClean) ||
                       /sent\s+GHS\s*([\d\.,]+)\s+to\s+([^\.]+)/i.exec(bodyClean);
                       
        // Payments (Expense)
        // E.g. "payment of GHS 45.00 made to ECG"
        const rxPayment = /payment\s+of\s+GHS\s*([\d\.,]+)\s+made\s+to\s+([^\.]+)/i.exec(bodyClean);

        // General Amount Match fallback
        const amtMatch = /(?:ghs|ghc|₵)\s*([\d\.,]+)/i.exec(bodyClean) || /(\d+\.\d{2})/.exec(bodyClean);

        if (rxReceived) {
            amount = parseFloat(rxReceived[1].replace(/,/g, ''));
            transaction_type = "income";
            description = "MoMo received from " + rxReceived[2].trim();
            category_suggestion = "other income";
        } else if (rxSent) {
            amount = parseFloat(rxSent[1].replace(/,/g, ''));
            transaction_type = "expense";
            description = "MoMo transfer to " + rxSent[2].trim();
            category_suggestion = "transfer";
        } else if (rxPayment) {
            amount = parseFloat(rxPayment[1].replace(/,/g, ''));
            transaction_type = "expense";
            description = "Payment to " + rxPayment[2].trim();
            category_suggestion = "utilities";
        } else if (amtMatch) {
            amount = parseFloat(amtMatch[1].replace(/,/g, ''));
        }

        // Try to extract Transaction ID
        const idMatch = /ID:\s*(\d+)/i.exec(bodyClean) || /Trx\s*(\d+)/i.exec(bodyClean);
        if (idMatch) {
            reference_id = idMatch[1];
        }

        // Try to extract balance
        const balMatch = /balance\s+is\s+GHS\s*([\d\.,]+)/i.exec(bodyClean) || /balance:\s*GHS\s*([\d\.,]+)/i.exec(bodyClean);
        if (balMatch) {
            new_balance = parseFloat(balMatch[1].replace(/,/g, ''));
        }

        return {
            amount: amount,
            fee: fee,
            transaction_type: transaction_type,
            description: description,
            category_suggestion: category_suggestion,
            reference_id: reference_id,
            new_balance: new_balance,
            notes: "Parsed SMS via playground compiler."
        };
    }

    // ===== SIMULATE API CALL =====
    function simulateApiCall() {
        const method = methodSelect.value;
        const endpoint = endpointSelect.value;
        const startTime = performance.now();

        // Show loading state
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
        responseOutput.innerHTML = '<code class="json">// Fetching data...</code>';
        statusBadge.textContent = '...';
        statusBadge.className = 'status-badge';
        responseTime.textContent = '...';

        // Simulate network delay
        const delay = Math.random() * 300 + 100; // 100-400ms

        setTimeout(() => {
            const endTime = performance.now();
            const duration = Math.round(endTime - startTime);

            // Get mock response
            let response;
            if (endpoint === '/api/cedismart/parse-sms' && method === 'POST') {
                let smsText = "";
                try {
                    const parsedBody = JSON.parse(requestBody.value);
                    smsText = parsedBody.sms || "";
                } catch (e) {
                    smsText = "";
                }

                if (!smsText) {
                    response = {
                        status: 400,
                        data: {
                            success: false,
                            error: "Bad Request",
                            message: "Missing 'sms' field in request body JSON."
                        }
                    };
                } else {
                    const parsedResult = parseSMSClientSide(smsText);
                    response = {
                        status: 200,
                        data: {
                            success: true,
                            model: "gemini-2.5-flash",
                            data: parsedResult
                        }
                    };
                }
            } else if (mockResponses[endpoint] && mockResponses[endpoint][method]) {
                response = mockResponses[endpoint][method];
            } else {
                response = {
                    status: 405,
                    data: {
                        success: false,
                        error: "Method Not Allowed",
                        message: `${method} is not supported for ${endpoint}`
                    }
                };
            }

            // Update status badge
            statusBadge.textContent = response.status;
            if (response.status >= 200 && response.status < 300) {
                statusBadge.className = 'status-badge success';
            } else if (response.status >= 400) {
                statusBadge.className = 'status-badge error';
            }

            // Update response time
            responseTime.textContent = `${duration}ms`;

            // Update response output
            responseOutput.innerHTML = '<code class="json">' + syntaxHighlight(response.data) + '</code>';

            // Reset button
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="bx bx-play"></i> Send Request';

        }, delay);
    }

    // ===== EVENT LISTENERS =====
    endpointSelect.addEventListener('change', updateRequestBodyVisibility);
    methodSelect.addEventListener('change', updateMethodColor);
    sendBtn.addEventListener('click', simulateApiCall);

    // Initialize
    updateRequestBodyVisibility();

})();
