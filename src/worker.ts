import is_ip_private from "private-ip";

const ERROR = {
  MISSING_IP_ADDRESS: "MISSING_IP_ADDRESS",
  INVALID_IP_ADDRESS: "INVALID_IP_ADDRESS",
};

type APIResponse =
  | {
      status: 200;
      data?: {
        ip: string;
        private: boolean;
      };
    }
  | {
      status: 400;
      error: {
        code: keyof typeof ERROR;
        message: string;
      };
    };

export default {
  async fetch(request: Request): Promise<Response> {
    const { searchParams } = new URL(request.url);
    const ip = searchParams.get("ip");

    if (!ip) {
      return json({
        status: 400,
        error: {
          code: "MISSING_IP_ADDRESS",
          message:
            "Missing IP address. Make sure to include the `ip` query parameter.",
        },
      });
    }

    const isPrivate = is_ip_private(ip);

    if (typeof isPrivate !== "boolean") {
      return json({
        status: 400,
        error: {
          code: "INVALID_IP_ADDRESS",
          message:
            "Invalid IP address. Make sure you are using a valid IPv4 or IPv6 address.",
        },
      });
    }

    return json({
      status: 200,
      data: {
        ip,
        private: isPrivate,
      },
    });
  },
};

function json(data: APIResponse) {
  return new Response(JSON.stringify(data), {
    status: data.status,
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
