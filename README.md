# Simple Port API

Very simple project that displays common services used for a specific port number. The API responds with JSON.
Can be used to enhance output of enumeration and discovery scripts.

## Usage
Send HTTP-GET requests to `https://vercel-port-api.vercel.app/port/:portnumber`

### Example
To query known services for port 22 send a GET request to
```
https://vercel-port-api.vercel.app/port/22
```

**Response**
```json
{
  "success": true,
  "port": 22,
  "descriptions": [
    "Secure Shell (SSH), secure logins, file transfers (scp, sftp) and port forwarding"
  ],
  "count": 1
}
```
