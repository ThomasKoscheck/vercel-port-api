import Fastify from 'fastify'
import {Pool} from "pg"

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Ensure to set this environment variable
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = Fastify({
  logger: true,
})

app.get('/', async (req, reply) => {
  return reply.status(200).type('text/html').send(html)
})

app.get('/port/:portNumber', async (request, reply) => {
  const portNumber = parseInt(request.params.portNumber, 10);
  try {
    const { rows } = await pool.query('SELECT description FROM overview WHERE port = $1', [portNumber]);
    const descriptions = rows.map(row => row.description);
    return {
      success: true,
      port: portNumber,
      descriptions: descriptions,
      count: rows.length
    };
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ success: false, message: 'Internal server error' });
  }
});

export default async function handler(req, reply) {
  await app.ready()
  app.server.emit('request', req, reply)
}

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Port API</title>
    <style>
        body {
            background-color: #121212;
            color: #ffffff;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
        }
        h1, p {
            text-align: center;
        }
        .code {
            background-color: #212121;
            color: #ffffff;
            padding: 10px;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Dark Mode API</h1>
        <p>This website is running on Vercel with a REST API. You can post a port number to <code>/api/port/&lt;number&gt;</code> and receive a JSON response with port information.</p>
    </div>
</body>
</html>
`
