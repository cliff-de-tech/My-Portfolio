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
        }
    };

    // ===== DOM ELEMENTS =====
    const methodSelect = document.getElementById('method-select');
    const endpointSelect = document.getElementById('endpoint-select');
    const requestBodySection = document.getElementById('request-body-section');
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
        } else {
            requestBodySection.style.display = 'none';
            methodSelect.value = 'GET';
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
            if (mockResponses[endpoint] && mockResponses[endpoint][method]) {
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
    sendBtn.addEventListener('click', simulateApiCall);

    // Initialize
    updateRequestBodyVisibility();

})();
