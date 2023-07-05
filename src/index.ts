import type { Handler, HandlerEvent } from '@netlify/functions'
import is_ip_private from 'private-ip'

const ERROR = {
  MISSING_IP_ADDRESS: 'MISSING_IP_ADDRESS',
  INVALID_IP_ADDRESS: 'INVALID_IP_ADDRESS',
}

type Response =
  | {
      status: 200
      data?: {
        ip: string
        private: boolean
      }
    }
  | {
      status: 400
      error: {
        code: keyof typeof ERROR
        message: string
      }
    }

export const handler: Handler = async (event) => {
  const { ip } = event.queryStringParameters ?? {}

  if (!ip) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: 400,
        error: {
          code: 'MISSING_IP_ADDRESS',
          message: 'Missing IP address. Make sure to include the `ip` query parameter.',
        },
      } satisfies Response),
    }
  }

  const isPrivate = is_ip_private(ip)

  if (typeof isPrivate !== 'boolean') {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: 400,
        error: {
          code: 'INVALID_IP_ADDRESS',
          message: 'Invalid IP address. Make sure you are using a valid IPv4 or IPv6 address.',
        },
      } satisfies Response),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 200,
      data: {
        ip,
        private: isPrivate,
      },
    } satisfies Response),
  }
}
